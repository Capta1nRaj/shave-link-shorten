//! Client & Admin side model
//* This model is used to store the user accounts data.

import mongoose from "mongoose";

const userAccountsSchema = new mongoose.Schema({
    userFullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true, },
    userEmail: { type: String, required: true, unique: true, },
    userPassword: { type: String, required: true, },
    userMobileNumber: { type: String, },
    userProfilePic: { type: String, default: "" },
    userReferralCode: { type: String, required: true, unique: true, },
    // userReferrals: { type: [mongoose.Schema.Types.ObjectId], ref: "userAccounts", default: [] },
    userReferrals: { type: [mongoose.Schema.Types.Mixed], ref: "userAccounts", default: [] },
    // userReferredBy: { type: mongoose.Schema.Types.ObjectId, ref: "userAccounts", required: false, },
    userReferredBy: { type: mongoose.Schema.Types.Mixed, ref: "userAccounts", required: false, },
    userVerified: { type: Boolean, default: false, },
    userBanned: { type: Boolean, default: false, },
    points: { type: Number, default: 0, },
    userRole: { type: String, },
    userUniqueIdentification: { type: [String], default: [], },
    userBankDetails: {
        type: [
            {
                bankName: { type: String, },
                accountNumber: { type: String, },
                ifscCode: { type: String, }
            }
        ],
        default: []
    },
    userAddress: {
        type: [
            {
                addressLine1: { type: String },
                addressLine2: { type: String },
                landmark: { type: String },
                city: { type: String },
                country: { type: String },
                pincode: { type: String }
            }
        ],
        default: []
    }
}, {
    timestamps: true
});

userAccountsSchema.index({ userName: 1 }, { unique: true }); // Creating a unique index on userName
userAccountsSchema.index({ userEmail: 1 }, { unique: true }); // Creating a unique index on userEmail
userAccountsSchema.index({ userReferralCode: 1 }, { unique: true }); // Creating a unique index on userReferralCode
userAccountsSchema.index({ userReferredBy: 1 }); // Creating an index on referredBy

export default mongoose.models.userAccounts || mongoose.model('userAccounts', userAccountsSchema);