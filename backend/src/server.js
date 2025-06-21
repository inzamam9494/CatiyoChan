import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./db/index.js";
dotenv.config({
  path: "./env",
});


connectToDatabase();
