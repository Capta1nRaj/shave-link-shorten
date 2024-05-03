import mongoose from "mongoose";

const LinksListModelSchema = new mongoose.Schema({
    userName: { type: String },
    primaryURL: { type: String, },
    alias: { type: String, },
    clicksCount: { type: Number, default: 0 },
    toSupport: { type: Boolean, default: false },
    appOpener: { type: String, default: false },
}, { timestamps: true })

LinksListModelSchema.index({ userName: 1 })
LinksListModelSchema.index({ primaryURL: 1 })
LinksListModelSchema.index({ alias: 1 })

export default mongoose.models.linksList || mongoose.model('linksList', LinksListModelSchema);