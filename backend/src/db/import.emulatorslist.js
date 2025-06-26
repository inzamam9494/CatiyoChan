import mongoose from "mongoose";
import { EmulatorsList } from "../models/emulatorslist.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import emulatorsListData from "../data/emulators_list.json" assert { type: "json" };

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,})
  .then(async () => {
    await EmulatorsList.deleteMany({});
    await EmulatorsList.insertMany(emulatorsListData.emulators_list);
    console.log("Emulators list imported successfully!");
    process.exit();
  })
  .catch((error) => {   
    console.error("Error importing emulators list:", error);
    process.exit(1);
  });   