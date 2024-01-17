import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("storage");

const config_file = "config.json";
const config = {
  lt_port: "COM1",
  rt_port: "COM2",
  baud_rate: 115200,
  authorization: null,

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
