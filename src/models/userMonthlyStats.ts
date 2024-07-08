//! Client & Admin side model
//* This model will capture the monthly stats of the user

import mongoose from "mongoose";

const userMonthlyStatsSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    month: { type: String, required: true },
    totalLinksCreated: { type: Number, required: true },
    totalLinksDeleted: { type: Number },
}, { timestamps: true });

userMonthlyStatsSchema.index({ userName: 1 }); // Creating an index on userName
userMonthlyStatsSchema.index({ month: 1 }); // Creating an index on month

export default mongoose.models.userMonthlyStats || mongoose.model('userMonthlyStats', userMonthlyStatsSchema);