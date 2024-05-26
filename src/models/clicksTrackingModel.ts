//! Client side Model
//* This schema will capture the user location when the visit the link

import mongoose from "mongoose";

const ClicksTrackingSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    alias: { type: mongoose.Schema.Types.ObjectId, ref: "linksList", required: true },
    ip: { type: String },
    countryName: { type: String },
    countryCode: { type: String },
    stateName: { type: String },
    stateCode: { type: String },
    cityName: { type: String },
    zip: { type: String },
    timezone: { type: String },
    isp: { type: String },
    org: { type: String },
    as: { type: String },
}, { timestamps: true })

ClicksTrackingSchema.index({ userName: 1 })
ClicksTrackingSchema.index({ alias: 1 })
ClicksTrackingSchema.index({ countryName: 1 })
ClicksTrackingSchema.index({ stateName: 1 })
ClicksTrackingSchema.index({ cityName: 1 })
ClicksTrackingSchema.index({ timezone: 1 })

export default mongoose.models.clicksTracking || mongoose.model('clicksTracking', ClicksTrackingSchema);