import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState({});

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
