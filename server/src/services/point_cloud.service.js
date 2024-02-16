import { Socket } from "net";
import config from "./config.service.js";

export const openniSocket = new FrameSocket();
const formatLog = (message) => `OPENNI_SERVER: ${message}`;

function FrameSocket() {
  let listeners = [];
  let socket;

  this.addFrameListener = (callback) => {
    listeners.push(callback);
  };

  this.removeFrameListener = (callback) => {
    const i = listeners.indexOf(callback);
    i !== -1 && listeners.splice(i, 1);
  };

  this.requestFrame = () => {
    socket.requestFrame();
  };

  createSocket();

  function createSocket() {
    const request = new Uint8Array([0x0]);
    socket = new Socket();

    socket.requestFrame = () => {
      if (socket.busy) return;
      socket.busy = true;
      socket.write(request);
    };

    socket.sendFrame = (buffer) => {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](buffer);
      }
    };

    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("close", onClose);
    socket.connect(
      config.openni_server_port,
      config.openni_server_host,
      onConnection
    );
  }

  function onConnection() {
    console.log(formatLog("Connected"));
    socket.requestFrame();
  }

  let bytes_to_receive = 0;
  let bytes_to_offset = 0;
  let buffer = Buffer.from([]);
  function onData(data) {
    switch (bytes_to_receive) {
      case 0:
        bytes_to_receive = data.readInt32LE();
        buffer = Buffer.alloc(bytes_to_receive);
        bytes_to_offset = 4;
        break;

      default:
        bytes_to_offset = 0;
        break;
    }

    data.copy(buffer, buffer.byteLength - bytes_to_receive, bytes_to_offset);
    bytes_to_receive -= data.byteLength - bytes_to_offset;

    switch (bytes_to_receive) {
      case 0:
        socket.sendFrame(buffer);
        socket.busy = false;
        break;
    }
  }

  function onError(e) {
    console.error(formatLog(e));
  }

  async function onClose() {
    console.log(formatLog("Connection closed"));
    await new Promise((res) => setTimeout(res, 1000));
    createSocket();
  }
}
