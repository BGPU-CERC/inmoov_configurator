import { ReadlineParser, SerialPort } from "serialport";

export const ports = {
  lt_port: null,
  rt_port: null,
};

export function port_list() {
  return SerialPort.list();
}

export async function port_open(port_id, { path, rate }) {
  ports[port_id]?.isOpen && (await port_close(ports[port_id]));
  ports[port_id] = await new Promise((res, rej) => {
    let port = new SerialPort({ path, baudRate: rate, autoOpen: false });
    port.open((err) => (err ? rej(err) : res(port)));
  });

  const parser = new ReadlineParser();
  parser.on("data", console.log);
  ports[port_id].on("error", console.error);
  ports[port_id].pipe(parser);

  return ports[port_id];
}

export function port_close(port) {
  return new Promise((res, rej) => {
    port.close((err) => (err ? rej(err) : res(port)));
  });
}

export function servo_stop_all() {
  Object.values(ports)
    .filter(Boolean)
    .forEach((el) => {
      el.write([0, 0, 0, 11, 0]);
    });
}

export function servo_set_angle(port_id, { pin, angle, speed }) {
  let silence = [0, 0, 0];
  let tag = 10;
  let len = 5;
  let val = Buffer.alloc(len);
  val.writeUint8(pin, 0);
  val.writeInt16LE(angle, 1);
  val.writeInt16LE(speed, 3);

  ports[port_id].write([...silence, tag, len, ...new Uint8Array(val)]);
}

export function servo_attach(port_id, { pin, angle, speed }) {
  let silence = [0, 0, 0];
  let tag = 12;
  let len = 5;
  let val = Buffer.alloc(len);
  val.writeUint8(pin, 0);
  val.writeInt16LE(angle, 1);
  val.writeInt16LE(speed, 3);

  ports[port_id].write([...silence, tag, len, ...new Uint8Array(val)]);
}

export function servo_detach(port_id, { pin }) {
  let silence = [0, 0, 0];
  let tag = 13;
  let len = 1;
  let val = Buffer.alloc(len);
  val.writeUint8(pin, 0);

  ports[port_id].write([...silence, tag, len, ...new Uint8Array(val)]);
}
