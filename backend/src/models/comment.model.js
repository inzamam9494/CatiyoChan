import mongoose, { Schema } from "mongoose";

const gameCommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    game: {
      type: Number,
    },
    gameCategory: {
      type: String,
    },
    emulator: {
      type: Schema.Types.ObjectId,
      ref: "EmulatorsList",
    },
    commentType: {
      type: String,
      enum: ["game", "emulator"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GameComment = mongoose.model("GameComment", gameCommentSchema);
