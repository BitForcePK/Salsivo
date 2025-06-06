import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import React, { useEffect } from "react";
import { Alert } from "react-native";
import Api from "../api";

import { useNotifications } from "../hooks/useNotification";

export const AuthContext = React.createContext();

SplashScreen.preventAutoHideAsync();

export const AuthProvider = ({ children }) => {
  const { AskForPermission } = useNotifications();

  const [user, setUser] = React.useState({});
  const [profile, setProfile] = React.useState({});
  const [token, setToken] = React.useState(null);
  const [firstTime, setFirstTime] = React.useState(false);

  const [appLoaded, setAppLoaded] = React.useState(false);

  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-ExtraBold": require("../assets/fonts/Raleway-ExtraBold.ttf"),
    "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-Italic": require("../assets/fonts/Raleway-Italic.ttf"),
  });

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (appLoaded && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded, fontsLoaded]);

  const checkAuthState = async () => {
    const firstTime = await AsyncStorage.getItem("onboarding");
    const token = await SecureStore.getItemAsync("user-token");
    const user = await SecureStore.getItemAsync("user-info");

    console.log(firstTime);

    if (token && user) {
      login(token, JSON.parse(user));
    } else {
      setAppLoaded(true);
    }
  };

  const login = async (token, user) => {
    setToken(token);
    setUser(user);

    await SecureStore.setItemAsync("user-token", token);
    await SecureStore.setItemAsync("user-info", JSON.stringify(user));

    await getProfile();

    const tkn = await AskForPermission();
    if (tkn) {
      await Api.addDevice(tkn);
      await AsyncStorage.setItem("device", tkn);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setProfile({});

    await SecureStore.deleteItemAsync("user-token");
    await SecureStore.deleteItemAsync("user-info");
  };

  const getProfile = async () => {
    try {
      const res = await Api.getProfile();

      if (res?.error) {
        logout();
        return;
      }

      const user = res?.user;

      if (user?.status === "blocked") {
        logout();
        Alert.alert("Your account has been blocked");
      }

      setProfile(res?.user);
    } catch (error) {
      logout();
    } finally {
      setAppLoaded(true);
    }
  };

  if (!appLoaded || !fontsLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        user,
        profile,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
