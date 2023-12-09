import React from "react";
import { Col, Row } from "react-bootstrap";
import { config } from "../../config";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

export const BasicFormLayout = ({ children }) => {
  return (
    <div className="min-vh-100 flex_center form_container mx-auto z-5">
      <div
        className="w-100"
        style={{
          boxShadow: config.theme.form_box_shadow,
        }}
      >
        <Row className="h-100 " style={{ minHeight: "600px" }}>
          <Col xs={12} md={6} className="p-0">
            <div
              className="flex_center  h-100"
              style={{ backgroundColor: config.theme.main_clr }}
            >
              <Link to="/">
                <h4 className="text-white fw-bold text-capitalize">
                  <span className="mx-2">
                    <FiEdit2 />
                  </span>
                  Notes
                </h4>
              </Link>
            </div>
          </Col>
          <Col xs={12} md={6} className="h-100">
            <div className="w-100 h-100 flex_center flex-column">
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
