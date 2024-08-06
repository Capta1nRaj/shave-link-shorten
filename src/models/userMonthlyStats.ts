//! Client & Admin side model
//* This model will capture the monthly stats of the user

import mongoose from "mongoose";

const userMonthlyStatsSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    totalLinksCreated: { type: Number, default: 0 },
    totalLinksDeleted: { type: Number, default: 0 },
    totalClicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

userMonthlyStatsSchema.index({ userName: 1 }); // Creating an index on userName
userMonthlyStatsSchema.index({ createdAt: -1 }); // Creating an index on createdAt

export default mongoose.models.userMonthlyStats || mongoose.model('userMonthlyStats', userMonthlyStatsSchema);