import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Home from '../pages/Home';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return <>{isLoggedIn ? <Outlet>{children}</Outlet> : <Home />}</>;
};

export default ProtectedRoute;
