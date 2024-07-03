import userAccountsModel from '@/models/userAccountsModel';
import websiteStatsModel from '@/models/websiteStatsModel';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {

        if (request.headers.get('Authorization') !== `Bearer ${process.env.SECRET_CODE_FOR_PRIVATE_APIS}`) {
            return NextResponse.json({ message: "Unauthorized", status: 500 }, { status: 401 });
        }

        await renameFields();
        await renameUserReferralsToId();

        //! Sending response to the client
        return NextResponse.json({ message: "Schema updated!", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}

async function renameFields() {
    await connect2MongoDB();

    const getAccountsList = await userAccountsModel.find({}).select('userName userReferrals userReferredBy');

    for (let i = 0; i < getAccountsList.length; i++) {
        if (!getAccountsList[i].userReferredBy) {
            await getAccountsList[i].updateOne({ userReferredBy: null }, [{ $set: { userReferredBy: null } }]);
        } else if (typeof getAccountsList[i].userReferredBy === 'string') {
            const referralId = await userAccountsModel.findOne({ userName: getAccountsList[i].userReferredBy }).select('_id');
            console.log(referralId)
            await getAccountsList[i].updateOne({ userReferredBy: referralId._id }, [{ $set: { userReferredBy: referralId._id } }]);
        }
    }

    console.log('userReferredBy fieldname updated successfully.');
}

async function renameUserReferralsToId() {
    await connect2MongoDB();

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