import { ReadlineParser, SerialPort } from "serialport";
import config from "./config.service.js";

let port = null;

export async function port_list() {
  return (await SerialPort.list()).map((port) => {
    port.selected = port.path === config.serial_port;
    return port;
  });
}

export async function port_open({ path, rate }) {
  config.serial_port = path;
  config.baud_rate = rate;
  config.save();

  port?.isOpen && (await port_close(port));
  port = await new Promise((res, rej) => {
    let port = new SerialPort({ path, baudRate: rate, autoOpen: false });
    port.open((err) => (err ? rej(err) : res(port)));
  });

  const parser = new ReadlineParser();
  parser.on("data", console.log);
  port.on("error", console.error);
  port.pipe(parser);

  return port;
}

export function port_close(port) {
  return new Promise((res, rej) => {
    port.close((err) => (err ? rej(err) : res(port)));
  });
}

export function servo_stop_all() {
  port?.write([11, 0]);
}

export function servo_power({ state }) {
  port?.write([14, 1, state ? 0 : 1]);
}

export function servo_set_angle({ address, pin, angle, speed }) {
  let tag = 10;
  let len = 6;
  let val = Buffer.alloc(len);
  val.writeUint8(address, 0);
  val.writeUint8(pin, 1);
  val.writeInt16LE(angle, 2);
  val.writeInt16LE(speed, 4);

  write([tag, len, ...new Uint8Array(val)]);
}

export function servo_attach({ address, pin, angle, speed }) {
  let tag = 12;
  let len = 6;
  let val = Buffer.alloc(len);
  val.writeUint8(address, 0);
  val.writeUint8(pin, 1);
  val.writeInt16LE(angle, 2);
  val.writeInt16LE(speed, 4);

  write([tag, len, ...new Uint8Array(val)]);
}

export function servo_detach({ address, pin }) {
  let tag = 13;
  let len = 2;
  let val = Buffer.alloc(len);
  val.writeUint8(address, 0);
  val.writeUint8(pin, 1);

  write([tag, len, ...new Uint8Array(val)]);
}

export function set_led_state({ state }) {
  let tag = 15;
  let len = 1;
  let val = Buffer.alloc(len);
  val.writeUint8(state, 0);

  write([tag, len, ...new Uint8Array(val)]);
}

function write(message) {
  port.write(message);
}
