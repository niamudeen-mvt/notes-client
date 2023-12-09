import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
import "./header.css";
import { useAuth } from "../../context/authContext";
import { config } from "../../config";

const CommonLink = ({ text, route, url }) => {
  return (
    <Link
      to={url}
      className={`${route === url ? "active_nav_link" : "nav_link"}`}
    >
      {text}
    </Link>
  );
};

const CustomHeader = () => {
  const { isLoggedIn } = useAuth();

  const route = useLocation().pathname;

  const containerStyles = {
    // maxWidth: "1140px",
    width: "100%",
    zIndex: 1000,
  };
  return (
    <div className="mx-auto mb-3" style={containerStyles}>
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand
            to="#home"
            className={`${
              isLoggedIn ? "text-black" : "text-white"
            } p-0 fw-bold  text-capitalize`}
          >
            {config.PROJECT_NAME}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto  flexCenter">
              {isLoggedIn ? (
                <>
                  <CommonLink text="Notes" url="/notes" route={route} />
                  <CommonLink text="Profile" url="/profile" route={route} />
                  <CommonLink text="Logout" url="/logout" route={route} />
                </>
              ) : (
                <>
                  <CommonLink text="Home" url="/" route={route} />
                  <CommonLink text="Signup" url="/signup" route={route} />
                  <CommonLink text="Login" url="/login" route={route} />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomHeader;
