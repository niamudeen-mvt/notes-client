import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
import "./header.css";
import { useAuth } from "../../context/authContext";
import { config } from "../../config";

const Header = () => {
  const { isLoggedIn } = useAuth();

  const route = useLocation().pathname;

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand to="#home">{config.PROJECT_NAME}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  flexCenter">
            {isLoggedIn ? (
              <>
                <Link
                  to="/notes"
                  className={`pt-2 mx-2 ${route === "/notes" ? "active" : "link"
                    }`}
                >
                  NOTES
                </Link>
                <Link
                  to="/profile"
                  className={`pt-2 mx-2 ${route === "/profile" ? "active" : "link"
                    }`}
                >
                  PROFILE
                </Link>
                <Link to="/logout" className={` pt-2 mx-2 ${route === "/logout" ? "active" : "link"
                  }`}>
                  LOGOUT
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={` pt-2 mx-2 ${route === "/" ? "active" : "link"
                    }`}
                >
                  HOME
                </Link>
                <Link
                  to="/signup"
                  className={` pt-2 mx-2 ${route === "/signup" ? "active" : "link"
                    }`}
                >
                  SIGNUP
                </Link>
                <Link
                  to="/login"
                  className={` pt-2 mx-2 ${route === "/login" ? "active" : "link"
                    }`}
                >
                  LOGIN
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
