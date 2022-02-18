import axios from "axios";

//-- Url
const CONFIG_URL = "todos/1";

const getConfig = () => {
  return axios.get(CONFIG_URL);
};

export default {
  getConfig,
};
