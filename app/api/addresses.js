import client from "./client";
import axios from "axios";

const getAddressesByUserUd = async (userId) => {
  try {
    const response = await axios.get(client.localhost + `/addresses/${userId}`);

    console.log(response);
    const { addresses } = response.data;

    return addresses;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

const AddAddressByUserId = async (userId, address) => {
  try {
    await axios.post(client.localhost + "/addresses", { userId, address });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default {
  getAddressesByUserUd,
  AddAddressByUserId,
};
