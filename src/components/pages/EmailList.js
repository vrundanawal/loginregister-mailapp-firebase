import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { db } from "../../firebase.config";

const EmailList = () => {
  const getUser = async () => {
    try {
      const docSnap = await getDoc(doc(db, "mails", "test@gmail.com"));
      console.log(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
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
