//! Client & Admin side model
//* This model is used to store the pricing plans data

import mongoose from "mongoose";

const PricingPlansSchema = new mongoose.Schema({
    membershipType: {
        type: String,
        required: true
    },
    pricing: {
        monthly: {
            INR: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            USD: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            }
        },
        annually: {
            INR: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            USD: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            }
        }
    },
    monthlyLinks: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    trackedClicks: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    analyticsRetention: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    tags: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    linkExpirationByDate: {
        type: Boolean,
        required: true
    },
    linkExpirationByClicks: {
        type: Boolean,
        required: true
    },
    customQRBranding: {
        type: Boolean,
        required: true
    },
    passwordProtectedLinks: {
        type: Boolean,
        required: true
    },
    discordChatSupport: {
        type: Boolean,
        required: true
    },
    instantMeetSupport: {
        type: Boolean,
        required: true
    }
});

export default mongoose.models.PricingPlans || mongoose.model("PricingPlans", PricingPlansSchema);