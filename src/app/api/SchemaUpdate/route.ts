import userAccountsModel from '@/models/userAccountsModel';
import websiteStatsModel from '@/models/websiteStatsModel';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { secretPassword, toChange } = await request.json();

        if (secretPassword !== process.env.SECRET_CODE_FOR_PRIVATE_APIS) {
            return NextResponse.json({ message: "Just A POST call in /api/SchemaUpdate.", status: 401 }, { status: 200 });
        }

        //! Connecting to MongoDB
        await connect2MongoDB();

        if (!toChange) {
            const getAccountsList = await userAccountsModel.find({}).select('userName userReferrals userReferredBy');
            for (let i = 0; i < getAccountsList.length; i++) {
                console.log(!getAccountsList[i].userReferredBy)
            }
            return NextResponse.json({ getAccountsList, message: "Status Check Done", status: 200 }, { status: 200 });
        }

        await renameFields();
        await renameUserReferralsToId();
        await renameUserAccountsRole();

        //! Sending response to the client
        return NextResponse.json({ message: "Schema updated!", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

async function renameFields() {
    const getAccountsList = await userAccountsModel.find({}).select('userName userReferrals userReferredBy');

    for (let i = 0; i < getAccountsList.length; i++) {
        if (!getAccountsList[i].userReferredBy) {
            await getAccountsList[i].updateOne({ userReferredBy: null }, [{ $set: { userReferredBy: null } }]);
        } else if (typeof getAccountsList[i].userReferredBy === 'string') {
            const referralId = await userAccountsModel.findOne({ userName: getAccountsList[i].userReferredBy }).select('_id');
            if (referralId) {
                await getAccountsList[i].updateOne({ userReferredBy: referralId._id }, [{ $set: { userReferredBy: referralId._id } }]);
            }
        }
    }

    console.log('userReferredBy fieldname updated successfully.');
}

async function renameUserReferralsToId() {
    const getAccountsList = await userAccountsModel.find({}).select('userReferrals');

    for (let i = 0; i < getAccountsList.length; i++) {
        if (getAccountsList[i].userReferrals.length > 0) {
            for (let j = 0; j < getAccountsList[i].userReferrals.length; j++) {
                const userName = getAccountsList[i].userReferrals[j];
                const referredToId = await userAccountsModel.findOne({ userName: userName }).select('_id');
                if (referredToId && typeof getAccountsList[i].userReferrals[j] === 'string') {
                    getAccountsList[i].userReferrals[j] = referredToId._id;
                } else {
                    console.log(`User not found for userName: ${userName}`);
                }
            }

            // Save the updated userReferrals array
            await getAccountsList[i].save();
        }
    }

    console.log('User referrals updated successfully.');
}

async function renameUserAccountsRole() {
    await userAccountsModel.updateMany({ userRole: { $nin: ["Startup", "Professional", "Enterprise"] } }, { $set: { userRole: "Free Forever" } });
}