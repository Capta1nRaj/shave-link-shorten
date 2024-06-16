'use server'

import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';

//! Nodemailer auth settings
const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

//! Fetch contact us email template
function getEmailTemplate() {
    const filePath = path.join(process.cwd(), 'src', 'utils', 'Nodemail', './ContactUsEmailTemplate.html');
    return fs.readFileSync(filePath, 'utf-8');
}

//! Send email to the user
export default async function sendConfirmationMailToUser(userEmail: string, userName: string) {

    //! Fetcj the Email HTML template code
    const htmlContent = getEmailTemplate();

    //! Replacing the values in the code
    const replacedHtml = htmlContent.replace(/{{username}}/g, userName);

    //! Sending the mail to the user
    const receiver = {
        from: process.env.NODEMAILER_MAIL_FROM + "<" + process.env.NODEMAILER_USERNAME + ">",
        to: userEmail,
        subject: "Thanks for contacting ShaveLinks",
        html: replacedHtml,
    };

    try {
        await auth.sendMail(receiver);
        console.log('%c Email sent successfully', 'background: #222; color: #bada55');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
