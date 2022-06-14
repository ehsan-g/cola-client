import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BUILDINGS_URL = "http://127.0.0.1:8000/api/v1/buildings";

export interface CustomizeState {
  buildings: object[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null;
}

const initialState = {
  buildings: [],
  status: "idle",
  error: null,
};

export const fetchBuildings = createAsyncThunk(
  "posts/fetchBuildings",
  async () => {
    const response = await axios.get(BUILDINGS_URL);
    return response.data;
  }
);

// export const addNewBuilding = createAsyncThunk(
//   "buildings/addNewBuilding",
//   async (data) => {
//     const response = await axios.building(POSTS_URL, data);
//     return response.data;
//   }
// );

const buildingsSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBuildings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        // Adding date and reactions
        console.log(action);
        const loadedBuildings = action.payload.products.map(
          (building: { building_name: string }) => {
            return building.building_name;
          }
        );
        state.status = "succeeded";

        // Add any fetched buildings to the array
        state.buildings = state.buildings.concat(loadedBuildings);
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.error.message;
      });
  },
});

// export const selectAllBuildings = (state) => state.buildings.buildings;
// export const getBuildingsStatus = (state) => state.buildings.status;
// export const getBuildingsError = (state) => state.buildings.error;

// export const selectBuildingById = (state, buildingId) =>
//   state.buildings.buildings.find((building) => building.id === buildingId);

export default buildingsSlice.reducer;
