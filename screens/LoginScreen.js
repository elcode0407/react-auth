import { useState } from "react";
import { login } from "../util/auth";
import { Alert } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { useDispatch } from "react-redux";
import { authenticated } from "../redux/auth";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await login(email, password);
      dispatch(authenticated({ token: token }));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in.\n \nPlease check your credentials or try again later!"
      );
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message={"Signing In"} />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
