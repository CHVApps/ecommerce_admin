import axios from "axios";

const API_URL = "https://ecommerce-backend-lv9n.onrender.com/api/auth";

export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // { message: "Login Successful", token: "JWT_TOKEN" }
  } catch (error) {
    throw error.response?.data?.message || "Login Failed";
  }
};
