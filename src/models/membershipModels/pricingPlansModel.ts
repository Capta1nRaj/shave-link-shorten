import mongoose from "mongoose";

// Schema for the pricing tiers (Basic, Basic Plus, Premium)
const TierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
        featured: {
            type: Boolean,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            monthly: { type: Number, required: true },
            annually: { type: Number, required: true },
        },

        // Discount pricing
        discountPrice: {
            monthly: { type: Number, default: 0 },
            annually: { type: Number, default: 0 },
        },
        isDiscountActive: { type: Boolean, default: false },
        // The date until which discount is valid
        discountActiveUntil: { type: Date }, // e.g. "2025-12-31"

        mainFeatures: {
            type: [String],
            required: true,
        },
    },
    { _id: false }
);

// Schema for the features in each section
const FeatureSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tiers: {
            "Free Forever": mongoose.Schema.Types.Mixed,
            "Startup": mongoose.Schema.Types.Mixed,
            "Professional": mongoose.Schema.Types.Mixed,
            "Enterprise": mongoose.Schema.Types.Mixed
        }
    },
    { _id: false }
);

// Schema for the sections containing features
const SectionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        features: [FeatureSchema],
    },
    { _id: false }
);

// Main schema for the subscription plans list
const pricingPlansSchema = new mongoose.Schema(
    {
        tiers: [TierSchema],
        sections: [SectionSchema],
    },
    { timestamps: true }
);

export default mongoose.models.pricingPlans || mongoose.model("pricingPlans", pricingPlansSchema);