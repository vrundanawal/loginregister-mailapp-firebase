import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
//import UserContext from "../../context/UserContext";
import Modal from "./Modal";
import UserEmails from "./UserEmails";
import Cookies from "js-cookie";
import UserContext from "../context/UserContext";

const EmailList = ({ userDetails }) => {
  console.log(userDetails);
  const userData = useContext(UserContext);
  const { setEmail } = userData;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [emailListings, setEmailListings] = useState([]);
  const readCookies = async () => {
    const user = Cookies.get("user");
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user));
      const loginUserDetail = docSnap.data();
      getMails(user);
      setEmail(loginUserDetail);
      //const user = docSnap.data();
      navigate("/mails");
    }
  };

  useEffect(() => {
    readCookies();
    if (!userDetails.email) {
      navigate("/login");
    } else {
      getMails(userDetails.email);
    }
    //to fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    return () => {
      setEmailListings([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMails = async (email) => {
    try {
      const mailCollection = collection(db, "mailsnew");
      const q = query(mailCollection, where("to", "==", email));

      const querySnapShot = await getDocs(q);
      const lists = [];
      //const fromEmail = {};
      querySnapShot.forEach(async (doc) => {
        console.log(doc.id);
        let emailData = doc.data();
        console.log(emailData);
        emailData.id = doc.id;
        lists.push(emailData);
        console.log(emailData);

        //console.log(emailData.from);
        //fromEmail.from = emailData.from;
        //console.log(fromEmail);
      });

      //getting the from emails details
      // const fromEmailsSnap = await getDoc(doc(db, "users", fromEmail.from));
      // const fromEmailGot = fromEmailsSnap.data();
      // console.log(fromEmailGot);

      setEmailListings(lists);
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
              userEmail={userDetails}
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
