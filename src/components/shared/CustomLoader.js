import React from "react";
import { Spinner } from "react-bootstrap";

const CustomLoader = () => {
  return (
    <div
      className="w-100 flex_center flex-column"
      style={{ minHeight: "70vh" }}
    >
      <Spinner animation="border" role="status" className="mb-3"></Spinner>
      <span>Loading.............</span>
    </div>
  );
};

export default CustomLoader;
