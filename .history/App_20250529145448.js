import "./src/config/axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// APP NAVIGATOR
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AuthNavigator/AuthNavigator";
import { AuthProvider } from "./src/contexts/authContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider></AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
