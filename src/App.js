import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainerNotification } from './utils/notifications';
import NoteProvider from './context/noteContext';
import ThemeContainer from './components/layout/ThemeContainer';
import Header from './components/layout/Header';
import ProtectedRoute from './routes/ProtectedRoutes';
import NotesPage from './pages/Notes';
import Profile from './pages/Profile';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import Home from './pages/Home';
import Logout from './pages/Logout';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <ThemeContainer>
                <NoteProvider>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/" element={<ProtectedRoute />}>
                            <Route path="notes" element={<NotesPage />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="logout" element={<Logout />} />
                        </Route>
                        <Route path="*" element={<Home />} />
                    </Routes>
                </NoteProvider>
            </ThemeContainer>
            <ToastContainerNotification />
        </BrowserRouter>
    );
};

export default App;
