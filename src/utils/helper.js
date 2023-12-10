import { jwtDecode } from "jwt-decode";
import { config } from "../config";
import { daysOfWeek } from "./constants";

// access token

export const storeAccessTokenLS = (accessToken) => {
  return localStorage.setItem(config.ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(config.ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => {
  return localStorage.removeItem(config.ACCESS_TOKEN_KEY);
};

export const isTokenExpired = (token) => {
  if (!token) {
    // If the token is not provided, consider it as expired
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    const currentTime = Date.now();

    return currentTime >= expirationTime;
  } catch (error) {
    // Handle decoding errors, consider the token as expired
    console.error("Error decoding token:", error);
    return true;
  }
};

// Refresh token

export const storeRefreshTokenLS = (refreshToken) => {
  return localStorage.setItem(config.REFRESH_TOKEN_KEY, refreshToken);
};
export const getRefreshToken = () => {
  return localStorage.getItem(config.REFRESH_TOKEN_KEY);
};

export const validateForm = (obj) => {
  let error = {};

  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let mobileRegex = /^([+]\d{2})?\d{10}$/;

  if (obj.username === "") {
    error.username = "This field is required";
  } else {
    error.username = "";
  }
  if (obj.email === "") {
    error.email = "This field is required";
  } else if (!emailRegex.test(obj.email)) {
    error.email = "Please enter valid email";
  } else {
    error.email = "";
  }
  if (obj.phone === "") {
    error.phone = "This field is required";
  } else if (!mobileRegex.test(obj.phone)) {
    error.phone = "Please enter valid mobile Number";
  } else {
    error.phone = "";
  }
  if (obj.password === "") {
    error.password = "This field is required";
  } else if (obj.password.trim().length < 3) {
    error.password = "Please must contain atleast 3 characters";
  } else {
    error.password = "";
  }

  return error;
};

export const checkIfobjEmpty = (obj) => {
  let noErrors = "";
  Object.keys(obj).forEach((e) => {
    if (obj[e] === "") {
      return (noErrors = true);
    } else return (noErrors = false);
  });

  return noErrors;
};

export const getUserId = () => {
  return sessionStorage.getItem("userId");
};

export const errorListtoObj = (errorsList) => {
  const arr = errorsList?.map((obj) => {
    return {
      [obj.path]: obj.msg,
    };
  });

  if (arr?.length) {
    const uniqueObjects = [];
    const keys = new Set();

    arr?.forEach((obj) => {
      const key = Object.keys(obj)[0];
      if (!keys.has(key)) {
        keys.add(key);
        uniqueObjects.push(obj);
      }
    });

    const combinedObject = uniqueObjects.reduce(
      (result, obj) => ({ ...result, ...obj }),
      {}
    );

    return combinedObject;
  }
};

// DATE AND TIME

export const formattedDate = (dateTime) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateFormatter.format(dateTime);
};

export const formattedTime = (dateTime) => {
  const filterdDay = daysOfWeek
    .map((day) => {
      if (day.value === dateTime.toString().substring(0, 3)) {
        return day.label;
      }
    })
    .filter((label) => label !== undefined);

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  console.log(timeFormatter.format(dateTime));
  return timeFormatter.format(dateTime) + "," + filterdDay;
};
