import mongoose, { Schema } from "mongoose";

const romsCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
 export const RomsCategory = mongoose.model("RomsCategory", romsCategorySchema);