// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../../screens/Splash/Splash.js";
import OnBoarding from "../../screens/OnBoarding/OnBoarding.js";
import SignUp from "../../screens/Auth/SignUp.js";
import SignIn from "../../screens/Auth/SignIn.js";
import ForgotPass from "../../screens/Auth/ForgotPass.js";
import ResetPass from "../../screens/Auth/ResetPass.js";
import ReferralSource from "../../screens/OnBoarding/ReferralSource.js";
import OtpVerification from "../../screens/Auth/OtpVerification.js";
import { useAuth } from "../../hooks/useAuth.js";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const { firstTime } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
      // initialRouteName={firstTime ? "OnBoarding" : "SignIn"}
    >
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
      {firstTime && <Stack.Screen name="OnBoarding" component={OnBoarding} />}
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ReferralSource" component={ReferralSource} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
    </Stack.Navigator>
  );
}
