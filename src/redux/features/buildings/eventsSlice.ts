import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../../apis/base";
import { Join, AxiosConfig } from "../../types/types";

export interface EventState {
  events: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  joined: Join;
}

const initialState: EventState = {
  events: [],
  status: "idle",
  error: "",
  joined: 0,
};

export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (roomId: number) => {
    const userJson = localStorage.getItem("userInfo");
    const userInfo = userJson !== null ? JSON.parse(userJson) : {};

    const config: AxiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await publicApi.get(`events/rooms/${roomId}`, config);
    return response.data;
  }
);

// register for an event
export const joinEvent = createAsyncThunk(
  "events/join",
  async (eventId: number) => {
    const userJson = localStorage.getItem("userInfo");
    const userInfo = userJson !== null ? JSON.parse(userJson) : {};

    const config: AxiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await publicApi.put(
      `events/register/${eventId}/${userInfo.id}`,
      config
    );
    return response.data;
  }
);

// leave an event
export const leaveEvent = createAsyncThunk(
  "events/leave",
  async (eventId: number) => {
    const userJson = localStorage.getItem("userInfo");
    const userInfo = userJson !== null ? JSON.parse(userJson) : {};

    const config: AxiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await publicApi.delete(
      `events/register/${eventId}/${userInfo.id}`,
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
        const loadingEvents = action.payload.map((event: Event) => {
          return event;
        });
        state.status = "succeeded";
        // Add any fetched events to the array
        state.events = state.events.concat(loadingEvents);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // join
      .addCase(joinEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(joinEvent.fulfilled, (state, action) => {
        state.joined = action.payload;
        state.status = "succeeded";
        state.events = [];
      })
      .addCase(joinEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // leave
      .addCase(leaveEvent.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(leaveEvent.fulfilled, (state, action) => {
        state.joined = action.payload;
        state.status = "succeeded";
        state.events = [];
      })
      .addCase(leaveEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
