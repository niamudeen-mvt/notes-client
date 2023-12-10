import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { config } from "../../config";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

export const BasicFormLayout = ({
  children,
  pageTitle = "Notes",
  pageIcon = <FiEdit2 />,
  checked,
  setChecked,
  handleEdit,
  showEditIcon = false,
}) => {
  const handleChange = () => {
    setChecked(!checked);
    handleEdit();
  };

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
            <div className="flex_center h-100 flex-column position-relative">
              {showEditIcon ? (
                <Form
                  className="mb-5 text-white position-absolute"
                  style={{ top: "48px", left: "48px" }}
                >
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Edit Profile"
                    checked={checked}
                    onChange={handleChange}
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
