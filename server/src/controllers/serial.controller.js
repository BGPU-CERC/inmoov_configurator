import { Router } from "express";
import {
  listPorts,
  openPort,
  ports,
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
  let silence = [0, 0, 0];
  let tag = [0];
  let len = [0];
  let val = [];

  switch (req.params.cmd) {
    case "set_angle":
      let { pin, angle, speed } = req.body;
      tag = [10];
      len = [5];
      // TODO BYTEARRAY
      val = [pin, 0, angle, 0, speed].slice(0, 6);
      break;
    default:
      break;
  }

  ports[req.params.port_name].write([...silence, ...tag, ...len, ...val]);

  res.send("ok");
});

router.post("/stop", async (req, res) => {
  await stopServos();
  res.send("ok");
});
