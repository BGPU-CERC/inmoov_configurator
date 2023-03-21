import { Router } from "express";
import { listPorts, openPort } from "../services/serial.service.js";

export const router = Router();

router.get("/ports", async (req, res) => {
  res.json(await listPorts());
});

router.put("/ports/:port_name", async (req, res) => {
  let port = await openPort({
    name: req.params.port_name,
    path: req.query.path,
    baudRate: req.query.rate,
  });

  res.json(port);
});
