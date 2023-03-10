import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        setFirstName(value);
        setFnameError(
          value
            ? /[a-zA-Z]+([_ -]?[a-zA-Z]){3,40}$/.test(value)
              ? ""
              : "Minimum 3 letters are required,no special characters and numbers allowed"
            : "Please enter the text"
        );
        break;
      case "lname":
        setLastName(value);
        setlnameError(
          value
            ? /[a-zA-Z]+([_ -]?[a-zA-Z]){3,40}$/.test(value)
              ? ""
              : "Minimum 3 letters are required,no special characters and numbers allowed"
            : "Please Enter your name"
        );
        break;
      case "phone":
        setPhone(value);
        setPhoneError(
          value
            ? /^[0-9]{10}$/.test(value)
              ? ""
              : "Only numbers with 10 digits allow"
            : "Please Enter your number"
        );
        break;
      case "email":
        setEmail(value);
        setEmailError(
          value
            ? /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
              ? ""
              : "Please enter a valid email address"
            : "Please enter your email address."
        );
        break;
      case "password":
        setPassword(value);
        setPasswordError(
          value
            ? value.length < 6
              ? "Password must be at least 6 characters long."
              : ""
            : "Please enter your password."
        );
        break;
      default:
        break;
    }
  };

  return (
    <UserContext.Provider
      value={{
        fname,
        lname,
        phone,
        email,
        password,
        fnameError,
        lnameError,
        phoneError,
        emailError,
        passwordError,
        setFirstName,
        setLastName,
        setPhone,
        setEmail,
        setPassword,
        handleInputChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
