import mongoose, { Schema } from "mongoose";

const helpCenterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  issue: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

export const HelpCenter = mongoose.model("HelpCenter", helpCenterSchema);
