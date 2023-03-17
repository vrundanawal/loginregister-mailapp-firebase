import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.config";

const Email = () => {
  const { id } = useParams();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchingUserEmailData = async () => {
      try {
        const emailRef = collection(db, "mailsnew");
        //Create a query
        const q = query(emailRef, where("type", "==", params.id));
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          console.log(doc.data());
        });
      } catch (error) {}
    };
    fetchingUserEmailData();
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-8 col-sm-12">
          {/* <h1>Hi : {`${id}`}</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Email;
