import mongoose from 'mongoose';

const ContactUsListSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    companyName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    message: { type: String },
    status: { type: String, default: 'Pending' }
});

export default mongoose.models.ContactUsList || mongoose.model('ContactUsList', ContactUsListSchema);