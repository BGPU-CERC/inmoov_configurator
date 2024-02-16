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

export const pointCloudSocketUrl = socketUrl("/point_cloud");
export const socket = new Socket(socketUrl(""));

function Socket(url) {
  let socket;
  let listener;

  createSocket();

  function createSocket() {
    socket = new WebSocket(url);
    socket.onmessage = listener;
    socket.onclose = async (event) => {
      if (event.wasClean) return;
      await new Promise((res) => setTimeout(res, 1000));
      createSocket();
    };

    this.send = socket.send;

    this.rpc = (function_name, params) => {
      const msg = { f: function_name, p: params };
      socket.send(JSON.stringify(msg));
    };

    this.onmessage = (callback) => {
      socket.onmessage = callback;
      listener = callback;
    };
  }
}

function socketUrl(socketPath) {
  let protocol = location.href.startsWith("https") ? "wss" : "ws";
  return protocol + "://" + location.host + apiPath + socketPath;
}
