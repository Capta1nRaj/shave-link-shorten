import contactUsListModel from '@/models/contactUsListModel';
import { connect2MongoDB } from 'connect2mongodb';
import { NextResponse, type NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import NodemailSetup from '@/utils/NodemailSetup';

//! Fetch contact us email template
function getEmailTemplate() {
    const filePath = path.join(process.cwd(), 'src', 'utils', 'NodemailEmailTemplates', './ContactUsEmailTemplate.html');
    return fs.readFileSync(filePath, 'utf-8');
}

export async function POST(request: NextRequest) {
    try {
        const { firstName, lastName, companyName, email, phoneNumber, message } = await request.json();

        if (!firstName || !lastName || !email || !phoneNumber || !message) { return NextResponse.json({ message: "Please fill in all required fields!.", status: 500 }, { status: 200 }); }

        //! Connecting to MongoDB
        await connect2MongoDB();

        //! Send a confirmation mail to the recipient
        const userFullName = firstName + " " + lastName;

        //! Fetch the Email HTML template code
        const emailHTMLTemplate = getEmailTemplate().replace(/{{username}}/g, userFullName);

        //! Sending mail to user
        await NodemailSetup({ userEmail: email, emailSubject: "Thanks for contacting ShaveLinks", emailHTMLTemplate });

        await new contactUsListModel({ firstName, lastName, companyName, email, phoneNumber, message }).save();

        return NextResponse.json({ message: "Mail sent.", status: 200 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error.", status: 500 }, { status: 200 });
    }
}