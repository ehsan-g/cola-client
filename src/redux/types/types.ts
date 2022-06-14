export interface Config {
  theme: string;
}

// export interface userAPI {
//   id: number;
//   building_name: string;
//   description: string;
//   company: string;
// }

export declare const userAPI: {
  fetchBuildingList<Response>(): { data: Response };
};

export enum ThemeType {
  PEPSI = "PEPSI_THEME",
  COKE = "COKE_THEME",
}

export enum ModeType {
  DARK = "dark",
  LIGHT = "light",
}

export enum UserType {
  USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
  USER_LOGOUT = "USER_LOGOUT",

  USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL = "USER_REGISTER_FAIL",
  USER_REGISTER_RESET = "USER_REGISTER_RESET",
}

export enum Building {
  name = "Ehsan",
}
