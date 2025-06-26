import mongoose from "mongoose";
import { EmulatorCategory } from "../models/emulators.category.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import emulatorsCategoryData from "../data/emulators_category.json" assert { type: "json" };

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,})
  .then(async () => {
    await EmulatorCategory.deleteMany({});
    await EmulatorCategory.insertMany(emulatorsCategoryData.emulators_category);
    console.log("Emulators categories imported successfully!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error importing emulators categories:", error);
    process.exit(1);
  });