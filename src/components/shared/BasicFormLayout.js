import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { config } from "../../config";
import { Link, useLocation } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import useWindowSize from "../../hooks/useWindowSize";

export const BasicFormLayout = ({
  children,
  pageTitle = "Notes",
  pageIcon = <FiEdit2 />,
  checked,
  setChecked,
  handleEdit,
  showEditIcon = false,
}) => {
  const windowObj = useWindowSize();

  const handleChange = () => {
    setChecked(!checked);
    handleEdit();
  };

  const routeName = useLocation().pathname;
  console.log(routeName);

  return (
    <div className="min-vh-100 flex_center form_container mx-auto z-5">
      <div
        className="w-100"
        style={{
          boxShadow: config.theme.form_box_shadow,
        }}
      >
        <Row
          className="h-100"
          style={{
            minHeight: "600px",
            backgroundColor: windowObj.width > 768 ? "" : "white",
          }}
        >
          {windowObj.width > 768 ? (
            <Col xs={12} md={6} className="p-0">
              <div className="flex_center h-100 flex-column position-relative">
                {showEditIcon ? (
                  <Form
                    className="mb-5 text-white position-absolute cursor"
                    style={{ top: "48px", left: "48px" }}
                  >
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                      label="Edit Profile"
                      checked={checked}
                      onChange={handleChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Form>
                ) : null}
                <div style={{ backgroundColor: config.theme.main_clr }}>
                  <Link to="/">
                    <h4 className="text-white fw-bold text-capitalize">
                      <span className="mx-2">{pageIcon}</span>
                      {pageTitle}
                    </h4>
                  </Link>
                </div>
              </div>
            </Col>
          ) : null}
          <Col xs={12} md={6} className="h-100 p-0">
            <div className="w-100 h-100 flex_center flex-column position-relative">
              {routeName === "/profile" &&
              showEditIcon &&
              windowObj.width < 768 ? (
                <div className="bg-primary w-100" style={{ height: "100px" }}>
                  <Form
                    className="text-white position-absolute cursor"
                    style={{ top: "48px", left: "48px" }}
                  >
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Edit Profile"
                      checked={checked}
                      onChange={handleChange}
                      style={{ cursor: "pointer" }}
                    />
                  </Form>
                </div>
              ) : null}
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
