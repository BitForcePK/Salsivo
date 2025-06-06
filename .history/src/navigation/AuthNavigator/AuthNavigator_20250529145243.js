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

export default function UserNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
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
