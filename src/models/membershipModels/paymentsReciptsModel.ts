//! Client & Admin side model
//* This model is used to store the OTPs for the users

import mongoose from "mongoose";

const paymentsReciptsSchema = new mongoose.Schema({
    //! _id will be txnID

    //* User Details
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },

    //* Plan Details
    frequency: { type: String, required: true },
    membershipType: { type: String, required: true },
    membershipPrice: { type: Number, required: true },

    //* Expiry & Status
    expiryDate: { type: mongoose.Schema.Types.Mixed, default: "" },
    expiredOn: { type: mongoose.Schema.Types.Mixed, default: "" },
    paymentDone: { type: Boolean, default: false },
    membershipAdded: { type: Boolean, default: false },

    //* Payment details from payu
    payuTxnID: { type: String },
    membershipID: { type: mongoose.Schema.Types.Mixed, ref: 'premiumMembers' },
}, {
    timestamps: true
});

paymentsReciptsSchema.index({ userName: 1 }); // Creating an index on userName
paymentsReciptsSchema.index({ expiryDate: 1 }); // Creating an index on expiryDate
paymentsReciptsSchema.index({ payuTxnID: 1 }); // Creating an index on payuTxnID

export default mongoose.models.paymentsRecipts || mongoose.model("paymentsRecipts", paymentsReciptsSchema);