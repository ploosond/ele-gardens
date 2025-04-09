import axios from "axios";

const baseUrl = "/api/employee";

const getAllEmployee = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAllEmployee };
