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

const createProduct = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { setToken, getAllProducts, createProduct };
