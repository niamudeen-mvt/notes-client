import React from "react";
import ThemeContainer from "../components/shared/ThemeContainer";

const Home = () => {
  return (
    <ThemeContainer>
      <div
        className="text-center p-5 flex_center flex-column"
        style={{ minHeight: "90vh" }}
      >
        <h1
          className="mb-3 fw-bolder text-capitalize d-flex  gap-4"
          style={{ fontSize: "60px", position: "relative", left: "-10px" }}
        >
          <span className="text-white">Welcome</span>to Notes
        </h1>
      </div>
    </ThemeContainer>
  );
};

export default Home;
