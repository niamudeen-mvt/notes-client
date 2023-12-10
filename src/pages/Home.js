import React from "react";

const Home = () => {
  return (
    <div
      className="text-center p-5 flex_center flex-column"
      style={{ minHeight: "90vh" }}
    >
      <h1
        className="mb-3 fw-bolder text-capitalize text-primary d-flex  gap-4"
        style={{ fontSize: "60px", position: "relative", left: "-10px" }}
      >
        <span className="text-white">Welcome</span>to Notes
      </h1>
    </div>
  );
};

export default Home;
