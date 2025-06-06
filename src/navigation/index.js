import AuthNavigator from "./AuthNavigator/AuthNavigator";
import { useAuth } from "../hooks/useAuth";
import UserNavigator from "./UserNavigator/UserNavigator";

export default function AppNavigator() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <UserNavigator /> : <AuthNavigator />;
}
