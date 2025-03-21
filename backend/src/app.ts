import 'reflect-metadata';
import initializeServer from "./server";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const port = process.env.WEB_PORT ?? 7768;

(async () => {
  try {
    initializeServer(port as number);
  } catch (err) {
    err;
    process.exit(1);
  }
})();
