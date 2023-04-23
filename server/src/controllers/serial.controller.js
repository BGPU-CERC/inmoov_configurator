import { Router } from "express";
import {
  port_list,
  servo_power,
  servo_stop_all,
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
