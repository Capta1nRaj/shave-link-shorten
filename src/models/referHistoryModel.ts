//! Client & Admin side model
//* This model is used to store the refer history of the users

import mongoose from "mongoose";

const ReferHistorySchema = new mongoose.Schema({
    userName: { type: String },
    points: { type: Number },
    reason: { type: String }
}, {
    timestamps: true
});

ReferHistorySchema.index({ userName: 1 }); // Creating an index on userName

export default mongoose.models.referHistory || mongoose.model("referHistory", ReferHistorySchema);