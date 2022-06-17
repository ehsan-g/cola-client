export interface ThemeConfig {
  theme: string;
}

export interface AxiosConfig {
  headers: {
    "Content-Type": "application/json";
    Authorization: any;
  };
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  image: string;
  permission_level: number;
  created_at: string;
  profile: {};
}

export interface LoginState {
  user: {} | null;
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | undefined;
  profile?: User | undefined;
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

export interface Floor {
  id?: number;
  title?: string;
  permission_level: number;
  building?: number;
  rooms?: Room[];
}

export interface Room {
  id?: number;
  building?: number;
  permission_level: number;
  title?: string;
}

export interface Building {
  id?: number;
  building_name?: string;
  description?: string;
  company?: number;
  image?: BuildingImage;
  address?: Address;
  floors?: Floor[];
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
