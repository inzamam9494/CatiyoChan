import mongoose from "mongoose";
import { Gamelist } from "../models/gamelist.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import gamelistData from "../data/gamelist.json" assert { type: "json" };

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