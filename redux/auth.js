import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    authenticated: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      AsyncStorage.setItem("token", action.payload.token);
    },
    logout: (state, action) => {
      state.isAuthenticated = null;
      AsyncStorage.removeItem("token");
    },
  },
});

export const { authenticated, logout } = authSlice.actions;
export default authSlice.reducer;
