import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { config } from "../../config";
import { FiEdit2 } from "react-icons/fi";
import useWindowSize from "../../hooks/useWindowSize";

const Header = () => {
  const { isLoggedIn } = useAuth();
  const windowObj = useWindowSize();
  const route = useLocation().pathname;

  const themeObj = {
    background: `linear-gradient(to right,${config.theme.main_clr} ${
      windowObj.width > 768 ? "50%" : "100%"
    }, white 50%)`,
  };
  console.log(windowObj.width > 768);

  return (
    <Navbar expand="lg" sticky="top" style={themeObj}>
      <Container>
        <Navbar.Brand
          to="/"
          className={`fw-bold text-capitalize p-0 text-white`}
        >
          <span className="mx-2">
            <FiEdit2 />
          </span>
          {config.PROJECT_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={` ${windowObj.width > 992 ? "ms-auto" : "flex_center"}`}
          >
            {isLoggedIn ? (
              <div className="py-4 d-flex gap-4">
                <CommonLink
                  text="Notes"
                  url="/notes"
                  route={route}
                  width={windowObj.width}
                />
                <CommonLink
                  text="Profile"
                  url="/profile"
                  route={route}
                  width={windowObj.width}
                />
                <CommonLink
                  text="Logout"
                  url="/logout"
                  route={route}
                  width={windowObj.width}
                />
              </div>
            ) : (
              <div className="py-4 d-flex gap-4">
                <CommonLink
                  text="Home"
                  url="/"
                  route={route}
                  width={windowObj.width}
                />
                <CommonLink
                  text="Signup"
                  url="/signup"
                  route={route}
                  width={windowObj.width}
                />
                <CommonLink
                  text="Login"
                  url="/login"
                  route={route}
                  width={windowObj.width}
                />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

const CommonLink = ({ text, route, url, width }) => {
  return (
    <Link
      to={url}
      className={`position-relative py-3 ${
        route === url
          ? `active_nav_link   ${
              width > 768 && width < 1000
                ? "text-black "
                : width > 1000
                ? "text-primary "
                : "text-white "
            }`
          : "nav_link text-dark fw-normal opacity-100"
      }`}
    >
      {text}
    </Link>
  );
};
