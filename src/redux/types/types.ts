export interface Config {
  theme: string;
}

export interface BuildingImage {
  id: number;
  image: string;
  alt_text: string;
  created_at: string;
  updated_at: string;
  building: number;
}
export interface Building {
  id?: number;
  building_name?: string;
  description?: string;
  company?: string;
  image?: BuildingImage;
}

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
