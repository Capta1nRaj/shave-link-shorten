//! Admin side Model
//* When admin creates a link, all the data & settings will be captured here

import mongoose from "mongoose";

const LinksListModelSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    destinationURL: { type: String },
    alias: { type: String },
    clicksCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    status: { type: Boolean, default: true },
    passwordProtection: { type: Boolean, default: false },
    password: { type: String }
}, { timestamps: true });

LinksListModelSchema.index({ userName: 1 })
LinksListModelSchema.index({ alias: 1 })

export default mongoose.models.LinksList || mongoose.model('LinksList', LinksListModelSchema);