import mongoose from "mongoose";
import { EmulatorsCategory } from "../models/emulators.category.model.js";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config({ path: "./.env" });

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read JSON file
const emulatorsCategoryData = JSON.parse(
  readFileSync(join(__dirname, "../data/emulators_category.json"), "utf8")
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,})
  .then(async () => {
    await EmulatorsCategory.deleteMany({});
    await EmulatorsCategory.insertMany(emulatorsCategoryData.emulators_category);
    console.log("Emulators categories imported successfully!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error importing emulators categories:", error);
    process.exit(1);
  });