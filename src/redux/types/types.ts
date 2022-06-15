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
export interface Address {
  id: number;
  country: string;
  city: string;
  address: string;
  created_at: string;
  building: number;
}
export interface Building {
  id?: number;
  building_name?: string;
  description?: string;
  company?: number;
  image?: BuildingImage;
  address?: Address;
}

export enum CompanyType {
  NONE = 0,
  PEPSI = 1,
  COKE = 2,
}

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
