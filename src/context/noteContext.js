import React, { createContext, useState, useContext, } from "react";

const NoteContext = createContext();

export const useNotes = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [note, setNote] = useState({
    message: ""
  });
  const handleChange = (e) => {
    setNote({ message: e.target.value });
  };



  return (
    <NoteContext.Provider
      value={{ note, handleChange, setNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
