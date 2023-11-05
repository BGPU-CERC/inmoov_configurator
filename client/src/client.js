import axios from "axios";

const apiPath = "/api";
const baseURL = location.origin + apiPath;
const timeout = 60 * 1000;

export const client = axios.create({
  baseURL,
  timeout,
});

client.interceptors.response.use(
  (value) => {
    return value.data;
  },
  (error) => {
    throw error;
  }
);

export let socket = null;
createSocket();

function createSocket() {
  socket = new WebSocket("ws://" + location.host + apiPath);

  socket.rpc = function (function_name, params) {
    const msg = { f: function_name, p: params };
    this.send(JSON.stringify(msg));
  };

  socket.onclose = async (event) => {
    if (event.wasClean) return;
    await new Promise((res) => setTimeout(res, 1 * 1000));
    createSocket();
  };
}
