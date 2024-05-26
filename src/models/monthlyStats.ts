//! Admin side model
//* This model will capture the monthly stats of the user

import mongoose from "mongoose";

const MonthlyStatsSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    month: { type: String, required: true },
    totalLinksCreated: { type: Number, required: true }
}, { timestamps: true });

MonthlyStatsSchema.index({ userName: 1 }); // Creating an index on userName
MonthlyStatsSchema.index({ month: 1 }); // Creating an index on month

export default mongoose.models.MonthlyStats || mongoose.model('MonthlyStats', MonthlyStatsSchema);