//! Admin side Model
//* When admin creates a link, all the data & settings will be captured here

import mongoose from "mongoose";

const validateStringOrNumber = (value: string | number) => {
    return typeof value === 'string' || typeof value === 'number';
};

const LinksListModelSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    destinationURL: { type: String },
    domainName: { type: String },
    alias: { type: String },
    comment: { type: String },
    description: { type: String },
    clicksCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    status: { type: Boolean, default: true },
    passwordProtection: { type: Boolean, default: false },
    password: { type: String, default: '' },
    toSupport: { type: Boolean, default: false },
    isApp: { type: Boolean, default: false },
    expiryDate: { type: String, default: "" },
    expiryByClicks: { type: mongoose.Schema.Types.Mixed, default: 'no', validate: [validateStringOrNumber, 'expiryByClicks must be a string or number'] },
}, { timestamps: true });

LinksListModelSchema.index({ userName: 1 })
LinksListModelSchema.index({ alias: 1 })
LinksListModelSchema.index({ expiryDate: 1 })
LinksListModelSchema.index({ createdAt: 1 })

export default mongoose.models.LinksList || mongoose.model('LinksList', LinksListModelSchema);