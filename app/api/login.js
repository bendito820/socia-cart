import client from "./client";
import axios from "axios";

const loginUser = async (user) => {
  try {
    await axios.post(client.localhost + "/login", user);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export default {
  loginUser,
};
