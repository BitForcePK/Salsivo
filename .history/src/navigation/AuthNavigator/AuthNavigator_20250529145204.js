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
import PremiumScreen from "../../screens/Premium/Premium.js";
import ProfileEditScreen from "../../screens/Settings/Profile.js";
import SettingsScreen from "../../screens/Settings/index.js";
import NewMoveScreen from "../../screens/Moves/newMove.js";
import TabNavigator from "../TabNavigator.js/index.js";
import MoveDetailsScreen from "../../screens/Home/MoveDetailScreen.js";
import ChangePassScreen from "../../screens/Settings/ChangePass.js";
import Subscriptions from "../../screens/Premium/Subscriptions.js";
import StitchMovesScreen from "../../screens/Home/StitchMovesScreen.js";
import SaveStitchScreen from "../../screens/Home/SaveStitch.js";
import ChoreographyScreen from "../../screens/Home/ChoreographyScreen.js";
import ChoreographiesList from "../../screens/Home/ChoreographiesList.js";

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
      <Stack.Screen name="ReferralSource" component={ReferralSource} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
    </Stack.Navigator>
  );
}
