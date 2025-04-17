import axios from "axios";

const baseUrl = "/api/employee";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllEmployees = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createEmployee = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateEmployee = async (employeeId, updatedEmployee) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(
    `${baseUrl}/${employeeId}`,
    updatedEmployee,
    config,
  );

  return response.data;
};

const deleteEmployee = async (productId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}/${productId}`, config);
  return response.data;
};

export default {
  setToken,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
