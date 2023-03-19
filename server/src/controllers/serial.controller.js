import { Router } from "express";
import { listPorts } from "../services/serial.service.js";

export const router = Router();

router.get("/ports", async (req, res) => {
  res.json(await listPorts());
});

router.put("/ports/current", async (req, res) => {
  res.json(await listPorts());
});
