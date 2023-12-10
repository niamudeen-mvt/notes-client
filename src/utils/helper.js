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

// Refresh token

export const storeRefreshTokenLS = (refreshToken) => {
  return localStorage.setItem(config.REFRESH_TOKEN_KEY, refreshToken);
};
export const getRefreshToken = () => {
  return localStorage.getItem(config.REFRESH_TOKEN_KEY);
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
