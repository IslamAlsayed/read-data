import axios from "axios";
import Cookies from "js-cookie";
const basicURL = "http://127.0.0.1:8000/";

export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  try {
    const response = await axios.post(
      basicURL + "register",
      {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log("login", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      console.error("Error occurred:", error.message);
      throw new Error("An error occurred");
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(basicURL + "login", {
      email: email,
      password: password,
    });

    // Setting cookies
    Cookies.set("token_shipment", response.data.token);
    Cookies.set("admin_shipment", JSON.stringify(response.data.data));

    console.log("login", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      console.error("Error occurred:", error.message);
      throw new Error("An error occurred");
    }
  }
};

export const logout = () => {
  return new Promise((resolve) => {
    Cookies.remove("token_shipment");
    Cookies.remove("admin_shipment");
    resolve({ message: "Logged out successfully" });
  });
};

export const getUser = () => {
  const user = Cookies.get("admin_shipment");
  return user ? JSON.parse(user) : null;
};

export const isAuth = () => {
  return !!Cookies.get("token_shipment");
};
