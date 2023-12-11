import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignupForm from '../pages/auth/SignupForm';
import LoginForm from '../pages/auth/LoginForm';
import Logout from '../pages/Logout';
import Profile from '../pages/Profile';
import NotesPage from '../pages/Notes';

export const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/signup',
        element: <SignupForm />,
    },
    {
        path: '/login',
        element: <LoginForm />,
    },

    {
        path: '/logout',
        element: <Logout />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/notes',
        element: <NotesPage />,
    },
    {
        path: '*',
        element: <Home />,
    },
];

export const renderRoutes = (routes = []) => {
    return (
        <Routes>
            {routes?.length
                ? routes?.map((e) => {
                      return (
                          <Route
                              key={e?.path}
                              path={e?.path}
                              element={e?.element}
                          />
                      );
                  })
                : null}
        </Routes>
    );
};
