import { doc, getDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useEffect } from "react";
import { db } from "../../firebase.config";
import UserContext from "../context/UserContext";

const EmailList = () => {
  const userData = useContext(UserContext);
  const userEmail = userData.user.email;
  console.log(userEmail);
  const getUser = async () => {
    try {
      const docSnap = await getDoc(doc(db, "mails", userEmail));
      console.log(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <button className="btn btn-primary me-md-2" type="button">
          Send Mail
        </button>
        <button className="btn btn-primary" type="button">
          compose Mail
        </button>
        <button className="btn btn-primary" type="button">
          All Mails
        </button>
      </div>
    </div>
  );
};

export default EmailList;
