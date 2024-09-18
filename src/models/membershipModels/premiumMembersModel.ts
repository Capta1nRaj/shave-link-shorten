//! Client & Admin side model
//* This model is used to store the OTPs for the users

import mongoose from "mongoose";

const premiumMembersSchema = new mongoose.Schema({
    //! _id will be membershipID

    //! User Details
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },

    //! Plan Details
    frequency: { type: String, required: true },
    membershipType: { type: String, required: true },
    membershipPrice: { type: Number, required: true },
    monthlyLinks: { type: Number, required: true },
    trackedClicks: { type: Number, required: true },
    analyticsRetention: { type: Number, required: true },
    tags: { type: Number, required: true },
    linkExpirationByDate: { type: Boolean, required: true },
    linkExpirationByClicks: { type: Boolean, required: true },
    customQRBranding: { type: Boolean, required: true },
    passwordProtectedLinks: { type: Boolean, required: true },
    discordChatSupport: { type: Boolean, required: true },
    instantMeetSupport: { type: Boolean, required: true },

    //! Expiry
    expiryDate: { type: mongoose.Schema.Types.Mixed, default: "" },
}, {
    timestamps: true
});

premiumMembersSchema.index({ userName: 1 }, { unique: true }); // Creating an index on userName

export default mongoose.models.premiumMembers || mongoose.model("premiumMembers", premiumMembersSchema);