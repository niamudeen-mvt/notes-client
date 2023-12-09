// ================== DEVELOPMENT URL =================
export const BASE_URL = "http://localhost:5000/api/v1";

// =================== PRODUCTION URL ================
// export const BASE_URL = "https://real-blue-cheetah-hat.cyclic.app/api/v1";

export const config = {
  ACCESS_TOKEN_KEY: process.env.REACT_APP_ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REACT_APP_REFRESH_TOKEN_KEY,
  PROJECT_NAME: "NOTES",

  theme: {
    main_clr: "#0d6efd",
    main_dark_clr: "#0a4eb4",
    main_light_clr: "",
  },
};
