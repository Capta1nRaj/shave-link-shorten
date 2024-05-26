//! Client side Model
//* This schema will capture the user location when the visit the link

import mongoose from "mongoose";

const ClicksListSchema = new mongoose.Schema({
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

ClicksListSchema.index({ userName: 1 })
ClicksListSchema.index({ alias: 1 })
ClicksListSchema.index({ countryName: 1 })
ClicksListSchema.index({ stateName: 1 })
ClicksListSchema.index({ cityName: 1 })
ClicksListSchema.index({ timezone: 1 })

export default mongoose.models.ClicksList || mongoose.model('ClicksList', ClicksListSchema);