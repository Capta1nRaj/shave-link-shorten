//! Client side Model
//* This schema will capture the user location when the visit the link

import mongoose from "mongoose";

const ClicksTrackingSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    alias: { type: mongoose.Schema.Types.ObjectId, ref: "linksList", required: true },
    ip: { type: String },
    countryName: { type: String, default: "Unknown" },
    countryCode: { type: String, default: "Unknown" },
    stateName: { type: String, default: "Unknown" },
    stateCode: { type: String, default: "Unknown" },
    cityName: { type: String, default: "Unknown" },
    zip: { type: String, default: "Unknown" },
    timezone: { type: String, default: "Unknown" },
    isp: { type: String, default: "Unknown" },
    org: { type: String, default: "Unknown" },
    as: { type: String, default: "Unknown" },
}, { timestamps: true })

ClicksTrackingSchema.index({ userName: 1 })
ClicksTrackingSchema.index({ alias: 1 })
ClicksTrackingSchema.index({ countryName: 1 })
ClicksTrackingSchema.index({ stateName: 1 })
ClicksTrackingSchema.index({ cityName: 1 })
ClicksTrackingSchema.index({ timezone: 1 })

export default mongoose.models.clicksTracking || mongoose.model('clicksTracking', ClicksTrackingSchema);