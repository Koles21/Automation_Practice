export const API_ENDPOINTS = {
  USERS: "/users",
  REGISTER: "/register",
  LOGIN: "/login",
  UPDATE_USER: (id: string) => `/users/${id}`,
} as const;
