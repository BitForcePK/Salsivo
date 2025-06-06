// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../../screens/Splash/Splash";
import OnBoarding from "../../screens/OnBoarding/OnBoarding";
import SignUp from "../../screens/Auth/SignUp";
import SignIn from "../../screens/Auth/SignIn";
import ForgotPass from "../../screens/Auth/ForgotPass";
import ResetPass from "../../screens/Auth/ResetPass";
import ReferralSource from "../../screens/OnBoarding/ReferralSource";
import OtpVerification from "../../screens/Auth/OtpVerification";
import PremiumScreen from "../../screens/Premium/Premium";
import ProfileEditScreen from "../../screens/Settings/Profile";
import SettingsScreen from "../../screens/Settings";
import NewMoveScreen from "../../screens/Moves/newMove";
import TabNavigator from "../TabNavigator.js";
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

      <Stack.Screen name="TabNavigator" component={TabNavigator} />

      <Stack.Screen name="MoveDetailsScreen" component={MoveDetailsScreen} />

      <Stack.Screen name="NewMoveScreen" component={NewMoveScreen} />

      <Stack.Screen name="Settings" component={SettingsScreen} />

      <Stack.Screen name="Profile" component={ProfileEditScreen} />
      <Stack.Screen name="ChangePass" component={ChangePassScreen} />
      <Stack.Screen name="Subscriptions" component={Subscriptions} />

      <Stack.Screen name="StitchMovesScreen" component={StitchMovesScreen} />
      <Stack.Screen name="SaveStitch" component={SaveStitchScreen} />

      <Stack.Screen name="ChoreographyScreen" component={ChoreographyScreen} />
      <Stack.Screen name="ChoreographiesList" component={ChoreographiesList} />
    </Stack.Navigator>
  );
}
