import React, { useEffect } from 'react';
import { PRIVATE_ROUTES, PUBLIC_ROUTES, config } from '../../config';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuth } from '../../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ThemeContainer = ({ children, center = false }) => {
    const windowObj = useWindowSize();

    const themeObj = {
        background: `linear-gradient(to right,${config.theme.main_clr} ${
            windowObj.width > 768 ? '50%' : '100%'
        } , white 50%)`,
    };

    const { isLoggedIn } = useAuth();
    const routeName = useLocation().pathname;
    const navigate = useNavigate();
    useEffect(() => {
        if (PUBLIC_ROUTES.includes(routeName) && isLoggedIn) {
            navigate('/profile');
        } else if (PRIVATE_ROUTES.includes(routeName) && !isLoggedIn) {
            navigate('/');
        }
    }, [routeName]);
    return (
        <section className="w-100" style={{ zIndex: -1 }}>
            <div
                className={`min-vh-100 h-auto py-5 ${
                    center ? 'flex_center' : ''
                }`}
                style={themeObj}
            >
                {children}
            </div>
        </section>
    );
};

export default ThemeContainer;
