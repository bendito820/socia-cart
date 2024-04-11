import axios from "axios";
import { localhost, apiClient } from "./client";

const endpoint = "/listings";

// const getListings = () => client.get(endpoint);
const getListings = () => () => {
  // const response = await axios.get("https://fakestoreapi.com/products");
  const response = axios.get(localhost + "/api/listings");
  return response;
  try {
  } catch (error) {
    console.error("Error rethrieving data ", error);
    return { error: error };
  }
};

export default {
  getListings,
};
