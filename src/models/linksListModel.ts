import mongoose from "mongoose";

const LinksListModelSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    primaryURL: { type: String },
    alias: { type: String },
    clicksCount: { type: Number, default: 0 },
    toSupport: { type: Boolean, default: false },
    appOpener: { type: Boolean, default: false },
    appType: { type: String, default: "" },
    tags: [{ type: String }],
    status: { type: Boolean, default: true }
}, { timestamps: true });

LinksListModelSchema.index({ userName: 1 })
LinksListModelSchema.index({ alias: 1 })

export default mongoose.models.LinksList || mongoose.model('LinksList', LinksListModelSchema);