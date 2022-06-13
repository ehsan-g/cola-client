import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../types/types";

export interface CustomizeState {
  activeTheme: ThemeType;
  activeMode: "light" | "dark" | "loading";
  status?: "success" | "loading" | "failed";
}

const initialState: CustomizeState = {
  activeTheme: ThemeType.PEPSI_THEME, // PEPSI_THEME or COKE_THEME
  activeMode: "dark", // light or dark
  status: "loading",
};

export const custumizerSlice = createSlice({
  name: "themeCustomizer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTheme: (state, action: PayloadAction<CustomizeState>) => {
      state.activeMode = action.payload.activeMode;
      state.activeTheme = action.payload.activeTheme;
    },
  },
});

export const { changeTheme } = custumizerSlice.actions;
export default custumizerSlice.reducer;
