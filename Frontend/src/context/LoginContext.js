import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <LoginContext.Provider value={{ userLogin, setUserLogin, modalOpen, setModalOpen }}>
      {children}
    </LoginContext.Provider>
  );
};

