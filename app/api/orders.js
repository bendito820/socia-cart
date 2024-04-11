import client from "./client";
import axios from "axios";

const placeOrder = async (orderData) => {
  const res = await axios.post(client.localhost + `/orders`, orderData);
  return res;
};

export default {
  placeOrder,
};
