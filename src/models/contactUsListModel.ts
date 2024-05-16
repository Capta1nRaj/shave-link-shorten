const { mongoose } = require("mongoose");

const ContactUsListSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    companyName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    message: { type: String },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.models.ContactUsList || mongoose.model('ContactUsList', ContactUsListSchema);