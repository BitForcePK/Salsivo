import axios from "axios";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import NetInfo from "@react-native-community/netinfo";

async function getToken() {
  const token = await SecureStore.getItemAsync("user-token");

  if (!token) return "";

  return token;
}

const URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api.salsivodanceapp.com/";

axios.defaults.baseURL = URL + "api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  async (config) => {
    const { isConnected } = await NetInfo?.fetch();

    if (!isConnected) {
      return Promise.reject("No internet connection");
    }

    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("e1");
    // Alert.alert(error?.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error?.code !== "ERR_NETWORK") {
    //   Alert.alert(error?.response?.data?.message || error.message);
    // }
    return Promise.reject(error);
  }
);

export default axios;
