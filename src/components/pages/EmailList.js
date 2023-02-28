//import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React from "react";
//import { db } from "../../firebase.config";

const EmailList = () => {
  // const getEmails = async () => {
  //   const allMails = collection(db, "users");
  //   // await setDoc(doc(usersRef, email), {
  //   //   user: ,
  //   // });
  //   const snapshot = await getDocs(allMails);
  //   const result = snapshot.docs.map((doc) => doc.data());
  //   console.log(result);
  //   return result;
  // };

  return (
    <div>
      <h3>Email list</h3>
      {/* <button onClick={getEmails}>All emails</button> */}
    </div>
  );
};

export default EmailList;
