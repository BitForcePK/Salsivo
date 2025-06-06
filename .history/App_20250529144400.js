import "./src/config/axios";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

// APP NAVIGATOR
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator/AppNavigator";
import { AuthProvider } from "./src/contexts/authContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Raleway-Bold": require("./src/assets/fonts/Raleway-Bold.ttf"),
  //   "Raleway-ExtraBold": require("./src/assets/fonts/Raleway-ExtraBold.ttf"),
  //   "Raleway-Medium": require("./src/assets/fonts/Raleway-Medium.ttf"),
  //   "Raleway-Regular": require("./src/assets/fonts/Raleway-Regular.ttf"),
  //   "Raleway-SemiBold": require("./src/assets/fonts/Raleway-SemiBold.ttf"),
  //   "Raleway-Italic": require("./src/assets/fonts/Raleway-Italic.ttf"), // If available
  // });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
