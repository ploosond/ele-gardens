import axios from "axios";

const baseUrl = "https://ele-gardens-r6f2.onrender.com/api/newsletter";

const subscribe = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

export default { subscribe };
