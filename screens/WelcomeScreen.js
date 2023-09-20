import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function WelcomeScreen() {
  const [message, setMessage] = useState();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios
      .get(
        "https://auth-react-4b5d2-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        setMessage(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    minWidth: "26%",
  },
});
