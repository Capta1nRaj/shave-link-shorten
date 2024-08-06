//! Client & Admin side model
//* This model is used to store the all the links & stats of a user

import mongoose from "mongoose";
require('./linksListModel')

const userAccountDataModel = new mongoose.Schema({
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

userAccountDataModel.index({ userName: 1 });
userAccountDataModel.index({ totalLinksCount: 1 }); // Creating an index on totalLinksCount

export default mongoose.models.userAccountData || mongoose.model('userAccountData', userAccountDataModel);