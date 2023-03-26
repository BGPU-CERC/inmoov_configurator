import { Router } from "express";
import {
  port_open,
  servo_attach,
  servo_detach,
  servo_set_angle,
} from "../services/serial.service.js";

export const router = Router({ mergeParams: true });

router.put("/", async (req, res) => {
  let port = await port_open(req.params.port_id, req.body);
  res.json(port);
});

router.post("/set_angle", async (req, res) => {
  await servo_set_angle(req.params.port_id, req.body);
  res.send("ok");
});

router.post("/attach", async (req, res) => {
  await servo_attach(req.params.port_id, req.body);
  res.send("ok");
});

router.post("/detach", async (req, res) => {
  await servo_detach(req.params.port_id, req.body);
  res.send("ok");
});
