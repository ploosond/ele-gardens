import axios from "axios";

const baseUrl = "https://ele-gardens-r6f2.onrender.com/api/products";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllProducts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOneProduct = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createProduct = async (formData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, formData, config);
  return response.data;
};

const updateProduct = async (productId, updatedProduct) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(
    `${baseUrl}/${productId}`,
    updatedProduct,
    config,
  );

  return response.data;
};

const deleteProduct = async (productId) => {
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
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
