import axios from "axios";
import client from "./client";

const { localhost } = client;

const registerUser = async (user) => {
  try {
    await axios.post(`${localhost}/register`, user);
    return { success: true };
  } catch (error) {
    console.log("Registration Failed", error);
    return { error };
  }
};

export default {
  registerUser,
};
