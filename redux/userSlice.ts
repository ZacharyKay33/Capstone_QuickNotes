import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { RootState } from "./store";

export interface userState {
  uid?: string | null | undefined;
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  photoURL?: string | null | undefined;
}

//Setup database interface
export interface dbReqs {}

var initialState = {} as userState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userState>) => {
      //Set state
      state = action.payload;
    },
    signup: (state, action: PayloadAction<userState>) => {
      //Set state
      state = action.payload;

      //Scaffold firebase
    },
    logout: (state) => {
      state = {
        uid: "",
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
      };
      const auth = getAuth();
      auth.signOut();
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
