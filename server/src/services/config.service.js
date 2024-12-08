import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("storage");

const config_file = "config.json";
const config = {
  port: 3000,
  authorization: null,

  openni_server_host: "127.0.0.1",
  openni_server_port: 8081,

  serial_port: "COM1",
  baud_rate: 115200,

  load() {
    const item = localStorage.getItem(config_file);
    item ? Object.assign(this, JSON.parse(item)) : this.save();
  },

  save() {
    localStorage.setItem(config_file, JSON.stringify(this, null, 2));
  },
};

config.load();

export default config;
