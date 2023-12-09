import React from "react";
import { config } from "../../config";
import Header from "../../layout/header/Header";

const ThemeContainer = ({ children, center = false }) => {
  const themeObj = {
    background: `linear-gradient(to right,${config.theme.main_clr} 50% , white 50%)`,
  };
  return (
    <>
      <header>
        <Header />
      </header>
      <section className="w-100 position-absolute top-0" style={{ zIndex: -1 }}>
        <div
          className={`min-vh-100 h-auto py-5 ${center ? "flex_center" : ""}`}
          style={themeObj}
        >
          {children}
        </div>
      </section>
    </>
  );
};

export default ThemeContainer;
