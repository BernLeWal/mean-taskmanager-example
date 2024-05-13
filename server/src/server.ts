import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { taskRouter } from "./task.routes";

// Load environment variables from the .env file, where the MONGODB_URL is configured
dotenv.config();

const { MONGODB_URL } = process.env;

if (!MONGODB_URL) {
  console.error(
    "No MONGODB_URL environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(MONGODB_URL)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/tasks", taskRouter);

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));