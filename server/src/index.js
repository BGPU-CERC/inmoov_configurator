import body_parser from "body-parser";
import express from "express";
import { createServer } from "http";
import { router as serial_controller } from "./controllers/serial.controller.js";
import { router as serial_port_controller } from "./controllers/serial_port.controller.js";
import { registerWebsockets } from "./websockets/index.js";
import { auth } from "./services/auth.service.js";
import config from "./services/config.service.js";

let app = express();
app.use(express.static("../client/dist"));
app.use(auth);
app.use(body_parser.json());
app.use("/api/serial", serial_controller);
app.use("/api/serial/ports/:port_id", serial_port_controller);

let port = config.port;
let server = createServer(app);
registerWebsockets(server);
server.listen(port);

console.log(`inmoov configurator server started on port ${port}`);
console.log(`access at http://localhost:${port}`);
