import {
  collection,
  doc,
  getDoc,
  getDocs,
  collectionGroup,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
//import UserContext from "../../context/UserContext";
import Modal from "./Modal";
import UserEmails from "./UserEmails";

const EmailList = ({ userDetails }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [emailListings, setEmailListings] = useState();

  // if (!userDetails.email) {
  //   navigate("/login");
  // }

  useEffect(() => {
    if (!userDetails.email) {
      navigate("/login");
    } else {
      getUser();
    }
  });

  const getUser = async () => {
    try {
      const mailCollection = collection(db, "mailsnew");
      const q = query(mailCollection, where("to", "==", userDetails.email));
      const querySnapShot = await getDocs(q);
      const lists = [];
      querySnapShot.forEach((doc) => {
        //console.log(doc.data());
        lists.push(doc.data());
        //console.log(doc.id, "=>", doc.data());
      });
      // setEmailListings(documents);
      console.log(lists);

      // querySnapShot.forEach((doc) => {
      //   //console.log(doc.data());
      //   const document = { [doc.id]: doc.data() };
      //   documents.push(document);
      //   //console.log(doc.id, "=>", doc.data());
      //   setEmailListings(documents);
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <button
              className="btn btn-primary"
              onClick={() => setOpenModal(true)}
            >
              Compose mail
            </button>
            <Modal
              openModal={openModal}
              onCloseModal={() => setOpenModal(false)}
              userEmail={userDetails.email}
            />
          </div>
          <div className="col-md-8 col-sm-12">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search in mails"
                />
              </div>
              {/* <UserEmails emailListings={emailListings} /> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailList;
