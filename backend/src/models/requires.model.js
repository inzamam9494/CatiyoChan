import mongoose, { Schema } from "mongoose";

const RequiresRomEmuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    requiresRomEmu: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export const RequiresRomEmu = mongoose.model(
  "RequiresRomEmu",
  RequiresRomEmuSchema
);
