import { configureStore } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
} from "../types/userConstants";
import customizeReducer from "../features/customizerSlice";
import { ThunkAction, Action } from "@reduxjs/toolkit";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: (action) => {
    if (action.type === USER_LOGIN_REQUEST) {
      return null;
    }
    if (action.type === USER_REGISTER_REQUEST) {
      return {
        ...action,
        password: null,
      };
    }

    return action;
  },
});

const preloadedState = {};

const reducer = {
  custumize: customizeReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(thunk),
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
