import React, { createContext, useState, useContext, useEffect } from "react";
import { getToken, removeToken } from "../utils/helper";
import { refreshToken } from "../services/api/user";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());

  const isLoggedIn = !!token;

  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("access_token", serverToken);
    setToken(serverToken);
  };

  const userLogout = () => {
    setToken("");
    removeToken();
  };

  useEffect(() => {
    const updateTokenFromLocalStorage = () => {
      const newToken = getToken();
      setToken(newToken);
    };

    window.addEventListener("storage", updateTokenFromLocalStorage);

    return () => {
      window.removeEventListener("storage", updateTokenFromLocalStorage);
    };
  }, []);

  // useEffect(() => {
  //   const tokenRefreshInterval = setInterval(async () => {
  //     const refresh_token = localStorage.getItem("refresh_token");
  //     const res = await refreshToken({ refresh_token });
  //     if (res?.status === 200) {
  //       storeTokenInLs(res.data.access_token);

  //       axios.defaults.headers.common["Authorization"] =
  //         "Bearer " + res.data.access_token;
  //     }
  //   }, 2000);
  //   return () => {
  //     clearInterval(tokenRefreshInterval);
  //   };
  // }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userLogout, storeTokenInLs, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
