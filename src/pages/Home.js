import React from "react";
import useWindowSize from "../hooks/useWindowSize";

const Home = () => {
  const windowSize = useWindowSize();
  return (
    <div
      className="text-center p-5 flex_center flex-column"
      style={{ minHeight: "90vh" }}
    >
      {windowSize.width > 768 ? (
        <h1
          className={`mb-3 fw-bolder text-capitalize  d-flex  gap-4 text-primary`}
          style={{ fontSize: "60px", position: "relative", left: "-10px" }}
        >
          <span className="text-white">Welcome</span>to Notes
        </h1>
      ) : (
        <h1
          className={`mb-3 fw-bolder text-capitalize  d-flex  gap-4 text-white
          `}
          style={{ fontSize: "40px", position: "relative", left: "-10px" }}
        >
          Welcome to Notes
        </h1>
      )}
    </div>
  );
};

export default Home;
