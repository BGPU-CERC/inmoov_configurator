import { servo_set_angle } from "../services/serial.service.js";
import { WebSocketServer } from "ws";

export const rpcSocket = new WebSocketServer({ noServer: true });
rpcSocket.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", on_message(ws));
});

const on_message = (ws) => (data) => {
  const { f: func, p: params } = JSON.parse(data);

  try {
    handle_rpc(func, params);
  } catch (error) {
    ws.send(String(error));
  }
};

function handle_rpc(func, params) {
  switch (func) {
    case "servo_set_angle":
      servo_set_angle(params);
      break;
    default:
      throw `unknown function ${func}`;
  }
}
