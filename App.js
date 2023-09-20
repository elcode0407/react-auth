import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import * as SplashScreen from "expo-splash-screen";

import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import IconButton from "./components/ui/IconButton";
import { authenticated, logout } from "./redux/auth";
import { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  return (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <IconButton
                icon={"exit"}
                color={tintColor}
                size={24}
                onPress={() => {
                  dispatch(logout());
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
}

function Navigation() {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Provider store={store}>
        {!auth.isAuthenticated && <AuthStack />}
        {auth.isAuthenticated && <AuthenticatedStack />}
      </Provider>
    </NavigationContainer>
  );
}

function Root() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      await SplashScreen.preventAutoHideAsync();
      if (storedToken) {
        dispatch(authenticated({ token: storedToken }));
      }
      SplashScreen.hideAsync();
    }
    fetchToken();
  }, []);
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
