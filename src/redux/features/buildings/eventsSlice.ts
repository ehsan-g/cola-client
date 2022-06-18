import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../../apis/base";

export interface EventState {
  events: object[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

export interface Config {
  headers: {
    "Content-Type": "application/json";
    Authorization: any;
  };
}

const initialState: EventState = {
  events: [],
  status: "idle",
  error: "",
};

export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (roomId: number) => {
    const userJson = localStorage.getItem("userInfo");
    const userInfo = userJson !== null ? JSON.parse(userJson) : {};

    const config: Config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await publicApi.get(
      `buildings/rooms/${roomId}/events`,
      config
    );
    return response.data;
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = "loading";
        state.events = [];
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = [];
        const loadingEvents = action.payload.events.map((event: Event) => {
          return event;
        });
        console.log(action);
        state.status = "succeeded";
        // Add any fetched events to the array
        state.events = state.events.concat(loadingEvents);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
