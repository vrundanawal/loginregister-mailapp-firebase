import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import Modal from "./Modal";
import UserEmails from "./UserEmails";
import Cookies from "js-cookie";
import UserContext from "../context/UserContext";
import Search from "./Search";

const EmailList = ({ userDetails }) => {
  //console.log(userDetails);
  const userData = useContext(UserContext);
  const { setEmail } = userData;

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [emailListings, setEmailListings] = useState([]);

  const [emailListLength, setEmailListLength] = useState([]);
  const [sendMailLength, setSendMailLength] = useState([]);

  // showEmail = false

  const readCookies = async () => {
    const user = Cookies.get("user");
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user));
      const loginUserDetail = docSnap.data();
      //console.log("loginUserDetail -- " + loginUserDetail.email);
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
      showSentEmails(userDetails.email);
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
        //console.log(doc.id);
        let emailData = doc.data();
        //console.log(emailData);
        emailData.id = doc.id;
        lists.push(emailData);
        //console.log(emailData);
      });

      setEmailListings(lists);
      setEmailListLength(lists);
    } catch (error) {
      console.log(error);
    }
  };

  //showSentEmails
  const showSentEmails = async (email) => {
    try {
      const mailCollection = collection(db, "mailsnew");
      const q = query(mailCollection, where("from", "==", email));
      const querySnapShot = await getDocs(q);
      const lists = [];
      querySnapShot.forEach(async (doc) => {
        // console.log(doc.data());
        let emailData = doc.data();
        //console.log(emailData);
        emailData.id = doc.id;
        lists.push(emailData);
        //console.log(emailData);
      });
      setEmailListings(lists);
      setSendMailLength(lists);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        {/* <div className="card col-md-4 mx-auto p-3 bg-light">
          <p>
            <b className="text-success">User Loggin successfully</b>
          </p>
        </div>
        <br /> */}
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <button
              className="btn btn-primary m-2 mb-3"
              onClick={() => setOpenModal(true)}
            >
              Compose mail
            </button>

            <br />
            <button
              type="button"
              className="btn btn-primary position-relative"
              onClick={() => getMails(userDetails.email)}
            >
              Inbox
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {emailListLength.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>

            <br />

            <button
              type="button"
              className=" mt-3 btn btn-primary position-relative"
              onClick={() => showSentEmails(userDetails.email)}
            >
              Sent Mails
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {sendMailLength.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>

            <Modal
              openModal={openModal}
              onCloseModal={() => setOpenModal(false)}
              userEmail={userDetails}
            />
          </div>
          <div className="col-md-9 col-sm-12">
            {/* <form action="">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search in mails"
                />
              </div>
            </form> */}

            <Search />
            <UserEmails emailListings={emailListings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailList;
