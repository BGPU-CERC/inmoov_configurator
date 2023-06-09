import body_parser from "body-parser";
import express from "express";
import { router as serial_controller } from "./controllers/serial.controller.js";
import { router as serial_port_controller } from "./controllers/serial_port.controller.js";

let app = express();
let port = 3000;

app.use(body_parser.json());
app.use("/api/serial", serial_controller);
app.use("/api/serial/ports/:port_id", serial_port_controller);

app.listen(port, () => {
  console.log(`inmoov configurator server started on port ${port}`);
});
