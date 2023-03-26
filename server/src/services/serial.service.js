import { ReadlineParser, SerialPort } from "serialport";

export const ports = {
  lt_port: null,
  rt_port: null,
};

export function list_ports() {
  return SerialPort.list();
}

export async function open_port({ name, path, baudRate }) {
  ports[name] && (await close_port(ports[name]));
  ports[name] = new SerialPort({ path, baudRate });

  const parser = new ReadlineParser();
  parser.on("data", console.log);
  ports[name].pipe(parser);

  return ports[name];
}

export function close_port(port) {
  return new Promise((res, rej) => {
    port.close((err) => (err ? rej(err) : res(port)));
  });
}

export function stop_servos() {
  Object.values(ports)
    .filter(Boolean)
    .forEach((el) => {
      el.write([0, 0, 0, 11, 0]);
    });
}

// TODO BYTEARRAY
export function servo_set_angle(port_name, { pin, angle, speed }) {
  let silence = [0, 0, 0];
  let tag = [10];
  let len = [5];
  let val = [pin, 0, angle, 0, speed].slice(0, 6);

  ports[port_name].write([...silence, ...tag, ...len, ...val]);
}

// TODO BYTEARRAY
export function servo_attach(port_name, { pin, angle }) {
  let silence = [0, 0, 0];
  let tag = [12];
  let len = [3];
  let val = [pin, 0, angle].slice(0, 3);

  ports[port_name].write([...silence, ...tag, ...len, ...val]);
}

// TODO BYTEARRAY
export function servo_detach(port_name, { pin }) {
  let silence = [0, 0, 0];
  let tag = [13];
  let len = [1];
  let val = [pin].slice(0, 1);

  ports[port_name].write([...silence, ...tag, ...len, ...val]);
}
