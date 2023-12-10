import React, { createContext, useState, useContext, useEffect } from "react";
import { getAccessToken, getUserID, removeAccessToken } from "../utils/helper";
import { delteNoteFolder } from "../services/api/notes";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getAccessToken());

  const isLoggedIn = !!token;

  const userLogout = async () => {
    await delteNoteFolder();
    setToken("");
    removeAccessToken();
  };

  useEffect(() => {
    const updateTokenFromLocalStorage = () => {
      const newToken = getAccessToken();
      setToken(newToken);
    };

    window.addEventListener("storage", updateTokenFromLocalStorage);

    return () => {
      window.removeEventListener("storage", updateTokenFromLocalStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userLogout, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
