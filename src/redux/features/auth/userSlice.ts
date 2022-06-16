import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../../apis/base";

export interface LoginState {
  user: {} | null;
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | undefined;
}

const userJson = localStorage.getItem("userInfo");
const userInfo = userJson !== null ? JSON.parse(userJson) : {};

const initialState: LoginState = {
  user: userInfo,
  status: "idle",
  error: "",
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = createAsyncThunk("login", async (values: LoginState) => {
  console.log("huh");
  const response = await publicApi.post("users/login", values.user, config);
  return response.data;
});

const userSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.user = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
