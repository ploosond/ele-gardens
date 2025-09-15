import axios from "axios";

const baseUrl = "/api/employees";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllEmployees = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createEmployee = async (formData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, formData, config);
  return response.data;
};

const updateEmployee = async (id, updatedEmployee) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedEmployee, config);

  return response.data;
};

const deleteEmployee = async (employeeId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}/${employeeId}`, config);
  return response.data;
};

export default {
  setToken,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
