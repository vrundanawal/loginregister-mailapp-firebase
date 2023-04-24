import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase.config";

const Email = () => {
  const [userData, setUserData] = useState(null);
  const params = useParams();
  console.log(params.id);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
    //navigate("/mails");
  };

  useEffect(() => {
    const fetchSingleEmail = async () => {
      const docRef = doc(db, "mailsnew", params.id); //get the document reference
      const docSnap = await getDoc(docRef); // take the snapshot of the reference
      //check if snapshot is exis then set then listing
      if (docSnap.exists()) {
        console.log(docSnap.data());

        setUserData(docSnap.data());
      }
    };
    fetchSingleEmail();
  }, [navigate, params.id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-8 col-sm-12">
          <p>From : {userData?.from}</p>
          <p>Subject : {userData?.subject}</p>

          <p>Body : {userData?.body}</p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default Email;
