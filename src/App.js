import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/header/Header";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";
import { ToastContainerNotification } from "./utils/notifications";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import NotesPage from "./pages/Notes";
import NoteProvider from "./context/noteContext";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <NoteProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </NoteProvider>
      <ToastContainerNotification />
    </BrowserRouter >
  );
};

export default App;