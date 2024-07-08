//! Client & Admin side model
//* This model is used to store website stats data in weekly frequency

import mongoose from "mongoose";

const websiteStatsSchema = new mongoose.Schema({
    weekNumber: { type: Number },
    monthNumber: { type: Number },
    yearNumber: { type: Number },
    newUsers: { type: Number, default: 0 },
    linksCreated: { type: Number, default: 0 },
    linksDeleted: { type: Number, default: 0 },
    linksClicksCount: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.models.websiteStats || mongoose.model('websiteStats', websiteStatsSchema);