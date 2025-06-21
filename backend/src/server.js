import { app } from "./app.js";
import dotenv from "dotenv";
import connectToDatabase from "./db/index.js";
dotenv.config({
  path: "./env",
});


connectToDatabase()
.then(() => {
  const serverPort = process.env.PORT || 3000;
  try {
    app.on("error", (err) => {
      console.error("Server error:", err);
      throw err;
    });

    app.listen(serverPort, () => {
      console.log(`\n Server is running on port ${serverPort} \n`);
    })
  } catch (error) {
    console.error("Error during server initialization:", error);
  }
})
.catch((error) => {
  console.log("MongoDB connection is failed!!:", error);
})