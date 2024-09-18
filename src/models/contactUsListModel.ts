//! Client side Model
//* This will send user message to admin mail, & a thanks for contacting mail to the user

import mongoose from "mongoose";

const ContactUsListSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    companyName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    message: { type: String },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

ContactUsListSchema.index({ status: 1 });
ContactUsListSchema.index({ createdAt: 1 });

export default mongoose.models.ContactUsList || mongoose.model('ContactUsList', ContactUsListSchema);