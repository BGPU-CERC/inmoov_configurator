import axios from "axios";
import { router } from "../src/router/index";
import { useAuth } from "./composables/useAuth";

const apiPath = (location.pathname + "/api").replace("//", "/");
const baseURL = location.origin + apiPath;
const timeout = 60 * 1000;
const { token } = useAuth();

export const client = axios.create({
  baseURL,
  timeout,
});

client.interceptors.request.use(
  (config) => {
    config.headers.authorization = token.value;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 403) {
      router.replace({ path: "/login" });
    }
    return Promise.reject(error);
  }
);

export let socket = null;
createSocket();

function createSocket() {
  let protocol = location.href.startsWith("https") ? "wss" : "ws";
  socket = new WebSocket(protocol + "://" + location.host + apiPath);

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
