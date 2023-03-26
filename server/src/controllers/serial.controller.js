import { Router } from "express";
import { port_list, servo_stop_all } from "../services/serial.service.js";

export const router = Router();

router.get("/ports", async (req, res) => {
  let ports = await port_list();
  res.json(ports);
});

router.post("/stop", async (req, res) => {
  await servo_stop_all();
  res.send("ok");
});
