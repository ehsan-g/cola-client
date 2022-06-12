import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../types/custumizerConstant";

export interface CustomizeState {
  activeTheme: string;
  activeMode: "light" | "dark" | "loading";
  status: "success" | "loading" | "failed";
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
    changeTheme: (state, action: PayloadAction<string>) => {
      state.activeTheme = action.payload;
    },
  },
});


export const { changeTheme } = custumizerSlice.actions;
export default custumizerSlice.reducer;
