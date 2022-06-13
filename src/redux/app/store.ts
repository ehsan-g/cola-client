import { configureStore } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";
import thunk from "redux-thunk";
import customizeReducer from "../features/customizerSlice";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { pokemonApi } from "../services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: (action) => {
    // if (action.type === UserType.USER_LOGIN_REQUEST) {
    //   return null;
    // }
    // if (action.type === UserType.USER_REGISTER_REQUEST) {
    //   return {
    //     ...action,
    //     password: null,
    //   };
    // }
    return action;
  },
});

const preloadedState = {};

const reducer = {
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  custumize: customizeReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(logger)
      .concat(thunk)
      .concat(pokemonApi.middleware),

  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [sentryReduxEnhancer],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
