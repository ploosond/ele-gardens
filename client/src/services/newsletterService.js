import axios from "axios";

const baseUrl = "/api/newsletter";

const subscribe = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

export default { subscribe };
