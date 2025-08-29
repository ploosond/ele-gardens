import axios from "axios";

const baseUrl = "/api/product";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllProducts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createProduct = async (formData) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(baseUrl, formData, config);
  return response.data;
};

const updateProduct = async (productId, updatedProduct) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
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
  createProduct,
  updateProduct,
  deleteProduct,
};
