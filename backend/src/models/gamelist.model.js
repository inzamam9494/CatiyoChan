import mongoose, { Schema } from "mongoose";

const gameDetailsSchema = new Schema({
  console: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  filesize: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  downloadLink: {
    type: String,
    required: true,
  },
});

const gameSchema = new Schema({
  game_name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  game_id: {
    type: Number,
    required: true,
  },
  game_image: {
    type: String,
    required: true,
  },
  game_size: {
    type: String,
    required: true,
  },
  game_category: {
    type: String,
    required: true,
  },
  game_details: {
    type: gameDetailsSchema,
    required: true,
  },
});

const gameListSchema = new Schema({
  "Nintendo Switch Game List": [gameSchema],
  "PS3 Game List": [gameSchema],
  "PS4 Game List": [gameSchema],
  "PS2 Game List": [gameSchema],
  "Windows Game List": [gameSchema],
  "PSP Game List": [gameSchema],
  "PS Vita Game List": [gameSchema],
  "Nintendo 3DS Game List": [gameSchema],
  "Nintendo Wii Game List": [gameSchema],
  "Xbox Game List": [gameSchema],
},
{
  timestamps: true,
});

export const Gamelist = mongoose.model("GameList", gameListSchema);
