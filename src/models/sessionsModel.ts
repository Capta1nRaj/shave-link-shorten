//! Client & Admin side model
//* This model is used to store the session data of the user

import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    jwtToken: { type: String },
    userAgent: { type: String, required: true },
    userRole: { type: String },
    OTP: { type: String, required: true },
    OTPCount: { type: Number, default: 0, },
    expireAt: { type: Date, default: Date.now, expires: 300 },
}, {
    timestamps: true
});
export default mongoose.models.sessions || mongoose.model("sessions", SessionsSchema);