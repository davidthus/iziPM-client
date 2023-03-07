import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, userId: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, userId } = action.payload;
      state.token = accessToken;
      state.userId = userId;
    },
    logOut: (state) => {
      state.token = null;
      state.userId = "";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
