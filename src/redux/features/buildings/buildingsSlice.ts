import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../../apis/base";
import { Building } from "../../types/types";
import userSlice from "../auth/userSlice";

export interface BuildingState {
  buildings: object[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

export interface Config {
  headers: {
    "Content-Type": "application/json";
    Authorization: any;
  };
}

const initialState: BuildingState = {
  buildings: [],
  status: "idle",
  error: "",
};

const userJson = localStorage.getItem("userInfo");
const userInfo = userJson !== null ? JSON.parse(userJson) : {};

const config: Config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo.token}`,
  },
};

export const fetchBuildings = createAsyncThunk(
  "buildings/fetchAll",
  async () => {
    const response = await publicApi.get("buildings", config);
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
        state.buildings = [];
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        const loadedBuildings = action.payload.buildings.map(
          (building: Building) => {
            return building;
          }
        );
        state.status = "succeeded";

        // Add any fetched buildings to the array
        state.buildings = state.buildings.concat(loadedBuildings);
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.error.message;
      });
  },
});

// export const selectAllBuildings = (state) => state.buildings.buildings;
// export const getBuildingsStatus = (state) => state.buildings.status;
// export const getBuildingsError = (state) => state.buildings.error;

// export const selectBuildingById = (state, buildingId) =>
//   state.buildings.buildings.find((building) => building.id === buildingId);

export default buildingsSlice.reducer;
