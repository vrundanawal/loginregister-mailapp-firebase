import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase.config";

const UserEmails = ({ userEmail }) => {
  const [listings, setListings] = useState(null);

  //   useEffect(() => {
  //     const fetchingEmailList = async () => {
  //       try {
  //         //get the reference
  //         const emailRef = collection(db, "mails");

  //         //create a queary
  //         const q = query(
  //           emailRef,
  //           where("type", "==", userEmail.email)
  //           //   orderBy("timestamp", "desc"),
  //           //   limit(10)
  //         );
  //         console.log(q);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchingEmailList();
  //   }, [userEmail.email]);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Sender</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>john@example.com</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserEmails;
