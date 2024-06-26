//! Client & Admin side model
//* This model is used to store the all the links & stats of a user

import mongoose from "mongoose";
require('./linksListModel')

const userLinksDataModel = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    totalLinksList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LinksList",
        required: true
    }],
    totalLinksCount: { type: Number, default: 0 },
    lifetimelinksCreated: { type: Number, default: 0 },
    lifetimelinksDeleted: { type: Number, default: 0 }
}, {
    timestamps: true
});

userLinksDataModel.index({ totalLinksCount: 1 }); // Creating an index on totalLinksCount

export default mongoose.models.userLinksData || mongoose.model('userLinksData', userLinksDataModel);