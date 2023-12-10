import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
import "./header.css";
import { useAuth } from "../../context/authContext";
import { config } from "../../config";
import { FiEdit2 } from "react-icons/fi";

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

const Header = () => {
  const { isLoggedIn } = useAuth();

  const route = useLocation().pathname;

  // const containerStyles = {
  //   maxWidth: "1140px",
  //   zIndex: 1000,
  // };

  // const brandStyles = {
  //   color: isLoggedIn ? config.theme.main_light_clr : "white",
  // };

  const themeObj = {
    background: `linear-gradient(to right,${config.theme.main_clr} 50% , white 50%)`,
  };

  return (
    // <div className="mx-auto py-3 border mb-5" style={containerStyles}>
    <Navbar expand="lg" className="" sticky="top" style={themeObj}>
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
    // </div>
  );
};

export default Header;
