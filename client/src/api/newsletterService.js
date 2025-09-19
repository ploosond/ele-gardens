import axios from "axios";

const baseUrl = "http://localhost:3001/api/newsletter";

const subscribe = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

export default { subscribe };
