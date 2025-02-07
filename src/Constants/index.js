 const apiUrl = "http://localhost:5500";

export const CUSTOM_CONSTANTS = {
  API_BASE_URL: apiUrl,
};

export const API_ENDPOINTS = {

  // Urls
  LOGIN: `${apiUrl}/api/user/login`,
  REGISTER: `${apiUrl}/api/user/register`, 
  LOGOUT:`${apiUrl}/api/user/logout`,
  
};

export const ACTION_TYPES = {
  AUTH: "AUTH",
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
  SHOW_LOADER: "SHOW_LOADER",
  HIDE_LOADER: "HIDE_LOADER",
};
