import { doc, getDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import UserContext from "../context/UserContext";
import Modal from "./Modal";

const EmailList = () => {
  const userData = useContext(UserContext);
  console.log(userData.user.email);
  //Create a state for modal
  const [openModal, setOpenModal] = useState(false);

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
            userEmail={userData.user.email}
          />
        </div>
        <div className="col-md-8 col-sm-12">
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search mails"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
