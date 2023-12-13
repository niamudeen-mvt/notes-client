// ================== DEVELOPMENT URL =================
// export const BASE_URL = 'http://localhost:7000/api/v1';

// =================== PRODUCTION URL ================
export const BASE_URL = 'https://real-blue-cheetah-hat.cyclic.app/api/v1';

// CONFIGURATION ========

export const config = {
    ACCESS_TOKEN_KEY: process.env.REACT_APP_ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REACT_APP_REFRESH_TOKEN_KEY,
    PROJECT_NAME: 'NOTES',

    theme: {
        main_clr: '#0d6efd',
        main_dark_clr: '#0a4eb4',
        main_light_clr: '#3e64ff',
        form_box_shadow: 'rgba(0, 0, 0, 0.35) -5px 5px 15px',
        light_grey_clr: 'b6b2b2',
        form_btn_box_shadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    },
};

export const PUBLIC_ROUTES = ['/signup', '/login'];
export const PRIVATE_ROUTES = ['/notes', '/profile'];
