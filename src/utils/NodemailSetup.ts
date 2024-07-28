'use server'

import nodemailer from "nodemailer";

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


//! Send email to the user
export default async function NodemailSetup(data: any) {

    //! Sending the mail to the user
    const receiver = {
        from: process.env.NODEMAILER_MAIL_FROM,
        to: data.userEmail,
        subject: data.emailSubject,
        html: data.emailHTMLTemplate,
    };

    try {
        await auth.sendMail(receiver);
        console.log('%c Email sent successfully', 'background: #222; color: #bada55');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
