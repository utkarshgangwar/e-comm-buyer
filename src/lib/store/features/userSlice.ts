// src/lib/store/features/userSlice.ts (or wherever your user/config slice is located)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  pincode: string;
}

const initialState: UserState = {
  pincode: "450289", // Default fallback pincode
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPincodeStore: (state, action: PayloadAction<string>) => {
      state.pincode = action.payload;
    },
  },
});

export const { setPincodeStore } = userSlice.actions;
export default userSlice.reducer;
