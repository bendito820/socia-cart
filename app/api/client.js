import { create } from "apisauce";

const localhost = "https://socia-cart-api-v1.onrender.com";

const apiClient = create({ baseURL: `${localhost}/` });

export default {
  apiClient,
  localhost,
};
