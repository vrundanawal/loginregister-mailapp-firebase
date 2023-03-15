import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
//import UserContext from "../../context/UserContext";
import Modal from "./Modal";
import UserEmails from "./UserEmails";

const EmailList = ({ userDetails }) => {
  console.log(userDetails);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [emailListings, setEmailListings] = useState([]);
  //const [id, setId] = useState([]);

  useEffect(() => {
    if (!userDetails.email) {
      navigate("/login");
    } else {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    try {
      const mailCollection = collection(db, "mailsnew");
      const q = query(mailCollection, where("to", "==", userDetails.email));
      const querySnapShot = await getDocs(q);
      const lists = [];
      //const IDS = [];
      querySnapShot.forEach((doc) => {
        console.log(doc.id);
        //lists.push(doc);
        lists.push(doc.data());
        //IDS.push(doc.id);
        //console.log(doc.id, "=>", doc.data());
      });

      setEmailListings(lists);
      //setId(IDS);
      //console.log(lists.length);
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
              className="btn btn-primary m-2 mb-3"
              onClick={() => setOpenModal(true)}
            >
              Compose mail
            </button>

            <br />
            <button type="button" className="btn btn-primary position-relative">
              Inbox
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {emailListings.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>

            <Modal
              openModal={openModal}
              onCloseModal={() => setOpenModal(false)}
              userEmail={userDetails.email}
            />
          </div>
          <div className="col-md-8 col-sm-12">
            <UserEmails emailListings={emailListings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailList;
