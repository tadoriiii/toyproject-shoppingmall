import axios from "axios";

const instance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

instance.interceptors.response.use((response) => {
  console.log(`instance interceptors response`, response);

  if (response.data?.status === "Error") {
    throw response;
  }
  return response;
});

const ClientErrorMessage = { status: 500, message: "Client Error" };

export const onLogin = async (body) => {
  try {
    return await instance.post("/auth/login", body);
  } catch (error) {
    console.log(error);
    throw error.data || ClientErrorMessage;
  }
};

export const getProducts = async (category) => {
  try {
    return await instance.get(`/products/category/${category}`);
  } catch (error) {
    console.log(error);
    throw error.data || ClientErrorMessage;
  }
};

export const getProduct = async (id) => {
  try {
    return await instance.get(`/products/${id}`);
  } catch (error) {
    console.log(error);
    throw error.data || ClientErrorMessage;
  }
};
