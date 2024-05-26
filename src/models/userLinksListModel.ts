import mongoose from "mongoose";
require('./linksListModel')

const userLinksListModel = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'userAccounts', required: true },
    totalLinksList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LinksList",
        required: true
    }],
    totalLinksCount: { type: Number, default: 0 },
    lifetimelinksCount: { type: Number, default: 0 },
    lifetimelinksDeleted: { type: Number, default: 0 }
}, {
    timestamps: true
});

userLinksListModel.index({ totalLinksCount: 1 }); // Creating an index on totalLinksCount

export default mongoose.models.userLinksList || mongoose.model('userLinksList', userLinksListModel);