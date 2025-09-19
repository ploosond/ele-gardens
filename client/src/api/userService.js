import axios from "axios";

const baseUrl = "https://ele-gardens-r6f2.onrender.com/api/users/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
