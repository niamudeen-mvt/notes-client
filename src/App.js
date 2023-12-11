import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainerNotification } from './utils/notifications';
import NoteProvider from './context/noteContext';
import ThemeContainer from './components/layout/ThemeContainer';
import Header from './components/layout/Header';
import { renderRoutes, routes } from './routes';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <ThemeContainer>
                <NoteProvider>{renderRoutes(routes)}</NoteProvider>
            </ThemeContainer>
            <ToastContainerNotification />
        </BrowserRouter>
    );
};

export default App;
