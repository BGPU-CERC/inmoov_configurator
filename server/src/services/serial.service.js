import { SerialPort } from "serialport";

const ports = {
  lt_port: null,
  rt_port: null,
};

export function listPorts() {
  return SerialPort.list();
}

export async function openPort({ name, path, baudRate }) {
  ports[name] && (await closePort(ports[name]));
  ports[name] = new SerialPort({ path, baudRate });
  return ports[name];
}

export function closePort(port) {
  return new Promise((res, rej) => {
    port.close((err) => (err ? rej(err) : res(port)));
  });
}
