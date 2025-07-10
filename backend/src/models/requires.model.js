import moongose, { Schema } from "mongoose";

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
export const RequiresRomEmu = moongose.model(
  "RequiresRomEmu",
  RequiresRomEmuSchema
);
