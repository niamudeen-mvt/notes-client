import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../config";

const Home = () => {
  return (
    <main className="common_container flex_center">
      <div className="text-uppercase text-center">
        <h1 className="mb-3">Welcome to {config.PROJECT_NAME}</h1>
        <Link to="/login">
          <Button className="py-3 px-5 text-uppercase">Signin</Button>
        </Link>
      </div >
    </main >
  );
};

export default Home;
