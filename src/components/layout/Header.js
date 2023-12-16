import React, { useRef } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { config } from '../../config';
import { FiEdit2 } from 'react-icons/fi';
import useWindowSize from '../../hooks/useWindowSize';

const Header = () => {
    const { isLoggedIn, userLogout } = useAuth();
    const windowObj = useWindowSize();
    const route = useLocation().pathname;
    const navbarRef = useRef(null);

    const themeObj = {
        background: `linear-gradient(to right,${config.theme.main_clr} ${
            windowObj.width > 768 ? '50%' : '100%'
        }, white 50%)`,
    };

    const handleNavLinkClick = () => {
        if (navbarRef.current) {
            navbarRef.current.classList.remove('show'); // Remove the 'show' class from the Navbar collapse
        }
    };

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
                <Navbar.Collapse id="basic-navbar-nav" ref={navbarRef}>
                    <Nav
                        className={`${
                            windowObj.width > 992
                                ? 'ms-auto'
                                : 'w-100 flex_center bg-primary mt-2'
                        }`}
                        style={{
                            minHeight: windowObj.width > 992 ? 0 : '70vh',
                            boxShadow:
                                windowObj.width > 992
                                    ? ''
                                    : '0px 4px 6px -1px rgba(0, 0, 0, 0.24)',
                        }}
                    >
                        {isLoggedIn ? (
                            <div
                                className={`py-4 d-flex  ${
                                    windowObj.width > 992
                                        ? 'gap-4'
                                        : 'flex-column'
                                }`}
                            >
                                <CommonLink
                                    handleNavLinkClick={handleNavLinkClick}
                                    text="Home"
                                    url="/"
                                    route={route}
                                    width={windowObj.width}
                                />
                                <CommonLink
                                    handleNavLinkClick={handleNavLinkClick}
                                    text="Notes"
                                    url="/notes"
                                    route={route}
                                    width={windowObj.width}
                                />
                                <CommonLink
                                    handleNavLinkClick={handleNavLinkClick}
                                    text="Profile"
                                    url="/profile"
                                    route={route}
                                    width={windowObj.width}
                                />

                                <Link
                                    to="/"
                                    className={`position-relative py-3 ${
                                        route === '/logout'
                                            ? `active_nav_link   ${
                                                  windowObj.width > 768 &&
                                                  windowObj.width < 1000
                                                      ? 'text-black '
                                                      : windowObj.width > 1000
                                                      ? 'text-primary '
                                                      : 'text-white '
                                              }`
                                            : 'nav_link text-dark fw-normal opacity-100'
                                    }`}
                                    onClick={userLogout}
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div
                                className={`py-4 d-flex ${
                                    windowObj.width > 992
                                        ? 'gap-4'
                                        : 'flex-column'
                                }`}
                            >
                                <CommonLink
                                    handleNavLinkClick={handleNavLinkClick}
                                    text="Home"
                                    url="/"
                                    route={route}
                                    width={windowObj.width}
                                />
                                <CommonLink
                                    handleNavLinkClick={handleNavLinkClick}
                                    text="Signup"
                                    url="/signup"
                                    route={route}
                                    width={windowObj.width}
                                />
                                <CommonLink
                                    handleNavLinkClick={handleNavLinkClick}
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

const CommonLink = ({ text, route, url, width, handleNavLinkClick }) => {
    return (
        <Link
            to={url}
            className={`position-relative py-3 ${
                route === url
                    ? `active_nav_link   ${
                          width > 768 && width < 1000
                              ? 'text-black '
                              : width > 1000
                              ? 'text-primary '
                              : 'text-white '
                      }`
                    : 'nav_link text-dark fw-normal opacity-100'
            }`}
            onClick={handleNavLinkClick}
        >
            {text}
        </Link>
    );
};
