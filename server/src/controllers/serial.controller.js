import { Router } from "express";
import {
  port_list,
  servo_power,
  servo_stop_all,
  set_led_state,
  port_open,
  servo_attach,
  servo_detach,
  servo_set_angle,
} from "../services/serial.service.js";

export const router = Router({ mergeParams: true });

router.get("/ports", async (req, res) => {
  let ports = await port_list();
  res.json(ports);
});

router.put("/port", async (req, res) => {
  let port = await port_open(req.body);
  res.json(port);
});

router.post("/power", async (req, res) => {
  await servo_power(req.body);
  res.send("ok");
});

router.post("/stop", async (req, res) => {
  await servo_stop_all();
  res.send("ok");
});

router.post("/led_state", async (req, res) => {
  await set_led_state(req.body);
  res.send("ok");
});

router.post("/set_angle", async (req, res) => {
  await servo_set_angle(req.body);
  res.send("ok");
});

router.post("/attach", async (req, res) => {
  await servo_attach(req.body);
  res.send("ok");
});

router.post("/detach", async (req, res) => {
  await servo_detach(req.body);
  res.send("ok");
});
