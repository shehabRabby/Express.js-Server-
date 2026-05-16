import app from "./app";
import config from "./config/env";
import { initDB } from "./db";

const main = () => {
  //connect to Neon DB
  initDB();
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
};

main();
