import React from "react";
import { config } from "../../config";

const ThemeContainer = ({ children, center = false }) => {
  const themeObj = {
    background: `linear-gradient(to right,${config.theme.main_clr} 50% , white 50%)`,
  };
  return (
    <section className="w-100">
      <div
        className={`min-vh-100 h-auto ${center ? "flex_center" : ""}`}
        style={themeObj}
      >
        {children}
      </div>
    </section>
  );
};

export default ThemeContainer;
