import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { RootState } from "./store";

export interface userState {
  uid?: string | null | undefined;
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  photoURL?: string | null | undefined;
}
const initialState: userState = {
  uid: "",
  displayName: "",
  email: "",
  phoneNumber: "",
  photoURL: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userState>) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.photoURL = action.payload.photoURL;
    },
    logout: (state) => {
      state = {
        uid: "",
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
