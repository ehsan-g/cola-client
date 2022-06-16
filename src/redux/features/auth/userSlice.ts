import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../../apis/base";

const userJson = localStorage.getItem("userInfo");
const userInfo = userJson !== null ? JSON.parse(userJson) : null;

export interface LoginState {
  user: {} | null;
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | undefined;
  profile?: {} | null;
}

const initialState: LoginState = {
  user: userInfo,
  status: "idle",
  error: "",
  profile: null,
};

export interface Config {
  headers: {
    "Content-Type": "application/json";
    Authorization: any;
  };
}

const config: Config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
};
export const fetchProfile = createAsyncThunk("profile", async () => {
  const userJson = localStorage.getItem("userInfo");
  const userInfo = userJson !== null ? JSON.parse(userJson) : null;
  const config: Config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo && userInfo.token}`,
    },
  };
  console.log(config);
  const response = await publicApi.get("users/profile-view", config);
  return response.data;
});

export const login = createAsyncThunk("login", async (values: LoginState) => {
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
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        state.error = "";
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
