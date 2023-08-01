/* import dotenv from "dotenv";

dotenv.config({path:new URL ("../../.env", import.meta.url).pathname})
 
 */


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import path from "path";

import { userRouter } from "../routes.js";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.MONGO_URI); 