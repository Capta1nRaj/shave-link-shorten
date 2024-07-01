//! Client side Model
//* This schema will capture the user location when the visit the link

import mongoose from "mongoose";

const ClicksTrackingSchema = new mongoose.Schema({
    //* Admin Details
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    alias: { type: mongoose.Schema.Types.ObjectId, ref: "linksList", required: true },
    //* Viewer Location Details
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
    //* Viewer Device Details
    browser: { type: String, default: "Unknown" },
    os: { type: String, default: "Unknown" },
    device: { type: String, default: "Desktop" },
    referrer: { type: String, default: "direct" }
}, { timestamps: true })

ClicksTrackingSchema.index({ userName: 1 })
ClicksTrackingSchema.index({ alias: 1 })
ClicksTrackingSchema.index({ countryName: 1 })
ClicksTrackingSchema.index({ stateName: 1 })
ClicksTrackingSchema.index({ cityName: 1 })
ClicksTrackingSchema.index({ browser: 1 })
ClicksTrackingSchema.index({ os: 1 })
ClicksTrackingSchema.index({ device: 1 })

export default mongoose.models.clicksTracking || mongoose.model('clicksTracking', ClicksTrackingSchema);