import mongoose from "mongoose";
import { Gamelist } from "../models/gamelist.model.js";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config({ path: "./.env" });

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read JSON file
const gamelistData = JSON.parse(
  readFileSync(join(__dirname, "../data/gamelist.json"), "utf8")
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
})
  .then(async () => {
    await Gamelist.deleteMany({});
    await Gamelist.insertMany(gamelistData.gamelist);
    console.log("Game list imported successfully!");
    process.exit();
  })
  .catch((error) => {   
    console.error("Error importing game list:", error);
    process.exit(1);
  });