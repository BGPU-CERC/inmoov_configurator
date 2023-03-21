import bodyParser from "body-parser";
import express from "express";
import { router as serialController } from "./controllers/serial.controller.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api/serial", serialController);

app.listen(port, () => {
  console.log(`inmoov configurator server started on port ${port}`);
});
