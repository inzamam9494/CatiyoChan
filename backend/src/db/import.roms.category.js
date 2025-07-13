import mongoose from "mongoose";
import { RomsCategory } from "../models/roms.category.model.js";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config({ path: "./.env" });

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read JSON file
const romsCategoryData = JSON.parse(
  readFileSync(join(__dirname, "../data/roms_category.json"), "utf8")
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
})
  .then(async () => {
    await RomsCategory.deleteMany({});
    await RomsCategory.insertMany(romsCategoryData.roms_category);
    console.log("Roms categories imported successfully!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error importing roms categories:", error);
    process.exit(1);
  });