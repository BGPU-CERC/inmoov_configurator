import { openniSocket } from "../services/point_cloud.service.js";
import { WebSocketServer } from "ws";

export const pointCloudSocket = new WebSocketServer({ noServer: true });
pointCloudSocket.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", on_message(ws));
});

const on_message = (ws) => (data) => {
  ws.ready = true;
  openniSocket.requestFrame();
};

openniSocket.addFrameListener((buffer) => {
  pointCloudSocket.clients.forEach((ws) => {
    if (!ws.ready) return;
    ws.send(buffer);
    ws.ready = false;
  });
});
