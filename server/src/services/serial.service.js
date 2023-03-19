import { SerialPort } from "serialport";

export function listPorts() {
  return SerialPort.list();
}

export function openPort(params) {
  return new SerialPort(params);
}
