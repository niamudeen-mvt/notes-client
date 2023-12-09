import React from "react";
import { Spinner } from "react-bootstrap";

const CustomLoader = () => {
  return (
    <div className="min-vh-100 w-100 flex_center flex-column">
      <Spinner animation="border" role="status" className="mb-3"></Spinner>
      <span>Loading.............</span>
    </div>
  );
};

export default CustomLoader;
