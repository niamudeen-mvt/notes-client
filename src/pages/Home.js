import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../config";
import { FiEdit } from "react-icons/fi";

const Home = () => {
  return (
    <main className="w-100">
      <div
        className="min-vh-100 flex_center"
        style={{
          background: `linear-gradient(to right,${config.theme.main_clr} 50% , white 50%)`,
          position: "absolute",
          inset: "0",
        }}
      >
        <Row className="w-100">
          <Col className="p-0 flex_center">
            {/* <h4 className="text-white fw-bold text-capitalize">
              <span className="mx-2">
                <FiEdit />
              </span>
              Notes
            </h4> */}
          </Col>
          <Col className="p-0">
            <div className="text-uppercase text-center    p-5">
              <h1 className="mb-3">Welcome to {config.PROJECT_NAME}</h1>
              <Link to="/login">
                <Button className="py-3 px-5 text-uppercase">Signin</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default Home;
