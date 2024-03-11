import { Router } from "express";
import {
  port_list,
  servo_power,
  servo_stop_all,
  set_led_state,
} from "../services/serial.service.js";

export const router = Router();

router.get("/ports", async (req, res) => {
  let ports = await port_list();
  res.json(ports);
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
