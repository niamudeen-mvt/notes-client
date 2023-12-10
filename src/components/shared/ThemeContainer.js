import React from "react";
import { config } from "../../config";
// import { useAuth } from "../../context/authContext";

const ThemeContainer = ({ children, center = false }) => {
  // const { isLoggedIn } = useAuth();
  // const themeObj = {
  //   background: isLoggedIn
  //     ? "transparent"
  //     : `linear-gradient(to right,${config.theme.main_clr} 50% , white 50%)`,
  // };
  const themeObj = {
    background: `linear-gradient(to right,${config.theme.main_clr} 50% , white 50%)`,
  };

  return (
    <section className="w-100" style={{ zIndex: -1 }}>
      {/* <section className="w-100 position-absolute top-0" style={{ zIndex: -1 }}> */}
      <div
        className={`min-vh-100 h-auto py-5 ${center ? "flex_center" : ""}`}
        style={themeObj}
      >
        {children}
      </div>
    </section>
  );
};

export default ThemeContainer;
