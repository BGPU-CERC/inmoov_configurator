import { pointCloudSocket } from "./point_cloud.websocket.js";
import { rpcSocket } from "./rpc.websocket.js";

export function registerWebsockets(server) {
  server.on("upgrade", function (request, socket, head) {
    switch (request.url) {
      case "/api":
        upgrade(rpcSocket, request, socket, head);
        break;

      case "/api/point_cloud":
        upgrade(pointCloudSocket, request, socket, head);
        break;

      default:
        socket.destroy();
        break;
    }
  });
}

function upgrade(wss, request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
}
