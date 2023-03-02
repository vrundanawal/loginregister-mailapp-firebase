import React, { createContext, useState } from "react";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });

  //handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <UserContext.Provider value={{ user, handleChange }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
