import mongoose, { Schema } from "mongoose";

const emulatorDetailsSchema = new Schema({
  publisher: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  platforms: {
    type: [String],
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  download_link: {
    type: String,
    required: true,
  },
});

const emulatorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  emulator_details: {
    type: emulatorDetailsSchema,
    required: true,
  },
});

const emulatorsListSchema = new Schema({
  "Nintendo Switch Virtual Console": [emulatorSchema],
  "Windows Emulators": [emulatorSchema],
  "PlayStation 3 Emulators": [emulatorSchema],
  "PlayStation 4 Emulators": [emulatorSchema],
  "PlayStation 2 Emulators": [emulatorSchema],
  "PlayStation Vita Emulators": [emulatorSchema],
  "PlayStation Portable Emulators": [emulatorSchema],
  "Nintendo 3DS Emulators": [emulatorSchema],
  "Nintendo Wii Emulators": [emulatorSchema],
  "Nintendo Wii U Emulators": [emulatorSchema],
  "Xbox Emulators": [emulatorSchema],
  "Xbox 360 Emulators": [emulatorSchema], 
},
{
  timestamps: true,
});

export const EmulatorsList = mongoose.model(
  "EmulatorsList",
  emulatorsListSchema
);
