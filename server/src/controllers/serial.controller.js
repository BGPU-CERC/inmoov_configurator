import { Router } from "express";
import {
  listPorts,
  openPort,
  servo_attach,
  servo_detach,
  servo_set_angle,
  stopServos,
} from "../services/serial.service.js";

export const router = Router();

router.get("/ports", async (req, res) => {
  res.json(await listPorts());
});

router.put("/ports/:port_name", async (req, res) => {
  let port = await openPort({
    name: req.params.port_name,
    path: req.body.path,
    baudRate: req.body.rate,
  });
  res.json(port);
});

router.post("/ports/:port_name/cmd/:cmd", async (req, res) => {
  switch (req.params.cmd) {
    case "set_angle":
      servo_set_angle(req.params.port_name, req.body);
      break;
    case "attach":
      servo_attach(req.params.port_name, req.body);
      break;
    case "detach":
      servo_detach(req.params.port_name, req.body);
      break;
    default:
      break;
  }

  res.send("ok");
});

router.post("/stop", async (req, res) => {
  await stopServos();
  res.send("ok");
});
