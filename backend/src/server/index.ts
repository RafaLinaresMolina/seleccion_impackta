import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db";
import * as dotenv from "dotenv";
import path from "path";
import pokemonRouter from "./routes/pokemon.routes"

dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

const env = process.env.NODE_ENV ?? "development";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/pokemon", pokemonRouter);

const initializeServer = (port: number): void => {
  const server = app.listen(port, () => {
    console.log(`[${env}] Listening on port ${port}`);
  });
  server.on("error", (error: any) => {
    console.log("Server error", error);
    if (error.code === "EADDRINUSE") {
      console.log("Port is already in use, retrying...");
    }
  });
  connectToDatabase();
};

export default initializeServer;
