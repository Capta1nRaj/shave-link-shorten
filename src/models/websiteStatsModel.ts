const { mongoose } = require("mongoose");

const websiteStatsSchema = new mongoose.Schema({
    weekNumber: { type: Number },
    monthNumber: { type: Number },
    yearNumber: { type: Number },
    activeUsers: { type: Number, default: 0 },
    linksCreated: { type: Number, default: 0 },
    linksDeleted: { type: Number, default: 0 },
    linksClicksCount: { type: Number, default: 0 }
}, { timestamps: true })

websiteStatsSchema.index({ weekNumber: 1 })
websiteStatsSchema.index({ monthNumber: 1 })
websiteStatsSchema.index({ yearNumber: 1 })
websiteStatsSchema.index({ activeUsers: 1 })
websiteStatsSchema.index({ linksCreated: 1 })
websiteStatsSchema.index({ linksClicksCount: 1 })

export default mongoose.models.websiteStats || mongoose.model('websiteStats', websiteStatsSchema);