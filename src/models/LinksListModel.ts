import mongoose from "mongoose";

const linksListModelSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    primaryURL: {
        type: String,
    },
    alias: {
        type: String,
    },
    clicksCount: {
        type: Number,
        default: 0
    },
    toSupport: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

linksListModelSchema.index({ userName: 1 })
linksListModelSchema.index({ primaryURL: 1 })
linksListModelSchema.index({ alias: 1 })

export default mongoose.models.linksList || mongoose.model('linksList', linksListModelSchema);