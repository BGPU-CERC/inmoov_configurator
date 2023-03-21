import { ReadlineParser, SerialPort } from "serialport";

export const ports = {
  lt_port: null,
  rt_port: null,
};

export function listPorts() {
  return SerialPort.list();
}

export async function openPort({ name, path, baudRate }) {
  ports[name] && (await closePort(ports[name]));
  ports[name] = new SerialPort({ path, baudRate });

  const parser = new ReadlineParser();
  parser.on("data", console.log);
  ports[name].pipe(parser);

  return ports[name];
}

export function closePort(port) {
  return new Promise((res, rej) => {
    port.close((err) => (err ? rej(err) : res(port)));
  });
}

export function stopServos() {
  Object.values(ports)
    .filter(Boolean)
    .forEach((el) => {
      el.write([0, 0, 0, 11, 0]);
    });
}
