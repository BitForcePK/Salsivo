import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

import Api from "../api";

const useAuthentication = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const logIn = async (token, user) => {
    setIsLogged(true);
    setToken(token);
    setUser(user);

    await SecureStore.setItemAsync("user-token", token);
    await SecureStore.setItemAsync("user", JSON.stringify(user));

    await getProfile();
  };

  const getProfile = async () => {
    const res = await Api.getProfile();

    if (res?.error) return;
    setProfile(res?.user);
  };

  const signOut = async () => {
    setIsLogged(false);
    setToken(null);
    setUser(null);
    setProfile(null);

    await SecureStore.deleteItemAsync("user-token");
    await SecureStore.deleteItemAsync("user");
  };

  return { logIn, signOut, getProfile };
};

export default useAuthentication;
