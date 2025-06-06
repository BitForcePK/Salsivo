import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { io } from "socket.io-client";

import React, { useEffect } from "react";
import { Alert } from "react-native";
import { screens } from "../routes/screens";
import Api from "../api";

import { useNotifications } from "../hooks/useNotifications";
import { initializeSocket } from "../utils/socket";

export const AuthContext = React.createContext();

SplashScreen.preventAutoHideAsync();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const { AskForPermission } = useNotifications();

  const [socket, setSocket] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [role, setRole] = React.useState(null);
  const [profile, setProfile] = React.useState({});
  const [token, setToken] = React.useState(null);
  const [stories, setStories] = React.useState([]);
  const [searches, setSearches] = React.useState([]);

  const [appLoaded, setAppLoaded] = React.useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded]);

  const checkAuthState = async () => {
    const token = await SecureStore.getItemAsync("user-token");
    const user = await SecureStore.getItemAsync("user-info");

    if (token && user) {
      login(token, JSON.parse(user));
    } else {
      setAppLoaded(true);
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: screens.auth }],
      // });
    }
  };

  const login = async (token, user) => {
    setToken(token);
    setUser(user);
    setRole(user?.role);

    await SecureStore.setItemAsync("user-token", token);
    await SecureStore.setItemAsync("user-info", JSON.stringify(user));

    await getProfile();
    await checkLogin(user);
    await getStories();

    if (!socket) {
      const newSocket = initializeSocket(token, user);
      setSocket(newSocket);
    }

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

  const checkLogin = async (user) => {
    if (!user?.isCompleted) {
      navigation.reset({
        index: 0,
        routes: [{ name: screens.completeProfile, params: { user } }],
      });
      return;
    }

    if (user?.status === "blocked") {
      logout();
      Alert.alert("Your account has been blocked");
    }
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

  if (!appLoaded) {
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
        role,
        getProfile,
        socket,
        checkLogin,
        token,
        appLoaded,
        stories,
        getStories,
        searches,
        addSearch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
