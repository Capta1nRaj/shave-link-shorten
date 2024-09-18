'use server'

import contactUsListModel from '@/models/contactUsListModel';
import { connect2MongoDB } from 'connect2mongodb';

interface SaveUserDataActionInterface {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

export async function SaveUserDataAction(contactUsFormData: SaveUserDataActionInterface) {
    try {
        const { firstName, lastName, companyName, email, phoneNumber, message } = contactUsFormData;

        if (!firstName || !lastName || !email || !phoneNumber || !message) { return { message: "Please fill in all required fields!.", status: 500 }; }

        //! Connecting to MongoDB
        await connect2MongoDB();

        //! Saving data to DB
        await new contactUsListModel({ firstName, lastName, companyName, email, phoneNumber, message }).save();

        return { message: "We will be in touch with you shortly.", status: 200 };
    } catch (error) {
        console.error(error);
        return { message: "Internal Server Error.", status: 500 };
    }
}