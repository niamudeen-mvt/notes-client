import React from "react";
import { config } from "../../config";
import useWindowSize from "../../hooks/useWindowSize";

const ThemeContainer = ({ children, center = false }) => {
  const windowObj = useWindowSize();

  const themeObj = {
    background: `linear-gradient(to right,${config.theme.main_clr} ${
      windowObj.width > 768 ? "50%" : "100%"
    } , white 50%)`,
  };

  return (
    <section className="w-100" style={{ zIndex: -1 }}>
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
