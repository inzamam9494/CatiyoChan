import mongoose from "mongoose";
import { RomsCategory } from "../models/roms.category.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import romsCategoryData from "../data/roms_category.json" assert { type: "json" };

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