import { WebSocketServer } from "ws";
import { servo_set_angle } from "../services/serial.service.js";

let wss = null;

function handle_rpc(func, params) {
  switch (func) {
    case "servo_set_angle":
      servo_set_angle(params.port_id, params);
      break;
    default:
      throw `unknown function ${func}`;
  }
}

function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", async function message(data) {
    const { f: func, p: params } = JSON.parse(data);

    try {
      await handle_rpc(func, params);
    } catch (error) {
      ws.send(String(error));
    }
  });
}

export function registerWebsocket({ server }) {
  if (!wss) {
    wss = new WebSocketServer({ server });
    wss.on("connection", connection);
  }
  return wss;
}
