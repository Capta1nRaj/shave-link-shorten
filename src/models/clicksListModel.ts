const { mongoose } = require("mongoose");

const ClicksListSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    alias: { type: mongoose.Schema.Types.ObjectId, ref: "LinksList" },
    ip: { type: String },
    country: { type: String },
    countryCode: { type: String },
    region: { type: String },
    regionName: { type: String },
    city: { type: String },
    zip: { type: String },
    timezone: { type: String },
    org: { type: String },
    as: { type: String },
}, { timestamps: true })

ClicksListSchema.index({ userName: 1 })
ClicksListSchema.index({ alias: 1 })
ClicksListSchema.index({ country: 1 })
ClicksListSchema.index({ regionName: 1 })
ClicksListSchema.index({ city: 1 })
ClicksListSchema.index({ timezone: 1 })

export default mongoose.models.ClicksList || mongoose.model('ClicksList', ClicksListSchema);