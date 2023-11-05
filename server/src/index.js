import body_parser from "body-parser";
import express from "express";
import { createServer } from "http";
import { router as serial_controller } from "./controllers/serial.controller.js";
import { router as serial_port_controller } from "./controllers/serial_port.controller.js";
import { registerWebsocket } from "./controllers/websocket.controller.js";

let app = express();
app.use(express.static("../client/dist"));
app.use(body_parser.json());
app.use("/api/serial", serial_controller);
app.use("/api/serial/ports/:port_id", serial_port_controller);

let port = 3000;
let server = createServer(app);
registerWebsocket({ server });
server.listen(port);

console.log(`inmoov configurator server started on port ${port}`);
console.log(`access at http://localhost:${port}`);
