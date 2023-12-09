import React, { createContext, useState, useContext } from "react";

const NoteContext = createContext();

export const useNotes = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [note, setNote] = useState({
    title: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  return (
    <NoteContext.Provider value={{ note, handleChange, setNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
