import contactUsListModel from '@/models/contactUsListModel';
import sendConfirmationMailToUser from '@/utils/Nodemail/NodemailSetup';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        //! Connecting to MongoDB
        await connect2MongoDB();

        const { firstName, lastName, companyName, email, phoneNumber, message } = await request.json();

        if (!firstName || !lastName || !email || !phoneNumber || !message) { return NextResponse.json({ message: "Please fill in all required fields!.", status: 500 }, { status: 200 }); }

        await sendConfirmationMailToUser(email, firstName + lastName);

        await new contactUsListModel({ firstName, lastName, companyName, email, phoneNumber, message }).save();

        return NextResponse.json({ message: "Mail sent.", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}