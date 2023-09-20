import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useDispatch } from "react-redux";
import { authenticated } from "../redux/auth";

function SignupScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function signUp({ email, password }) {
    setIsLoading(true);

    try {
      const token = await createUser(email, password);
      dispatch(authenticated({ toke: token }));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not sign you up.\n \nPlease check your input or try again later!"
      );
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay message={"Signing Up"} />;
  }
  return <AuthContent onAuthenticate={signUp} />;
}

export default SignupScreen;
