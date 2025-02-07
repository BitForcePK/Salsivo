// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../../screens/Splash/Splash";
import OnBoarding from "../../screens/OnBoarding/OnBoarding";
import SignUp from "../../screens/Auth/SignUp";
import SignIn from "../../screens/Auth/SignIn";
import ForgotPass from "../../screens/Auth/ForgotPass";
import ResetPass from "../../screens/Auth/ResetPass";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
    </Stack.Navigator>
  );
}
