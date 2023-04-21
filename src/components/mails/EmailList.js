import {
  addDoc,
  collection,
  deleteDoc,
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

  //Delete state
  const [deletedEmailState, setDeletedEmail] = useState([]);

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
      showDeleteEmail(userDetails.email);
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

  //Delete email

  const handleDeleteEmail = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const docRef = doc(db, "mailsnew", id);

        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());

        if (docSnap.exists()) {
          const deleteMailCollection = collection(db, "deletedMail");
          //console.log("Document data:", docSnap.data());
          const deleteMails = docSnap.data();
          console.log(deleteMails);
          deleteMails.isDeleted = true;
          await addDoc(deleteMailCollection, deleteMails);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        await deleteDoc(doc(db, "mailsnew", id));

        const updatedListings = emailListings.filter(
          (listing) => listing.id !== id
        );
        setEmailListings(updatedListings);
        setEmailListLength(updatedListings);
        setSendMailLength(updatedListings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //showDeleteEmail
  const showDeleteEmail1 = async () => {
    alert("Deleted");
    try {
      //const deleteCollectoion = collection(db, "deletedMail");
      const q = query(collection(db, "deletedMail"));
      const querySnapshot = await getDocs(q);
      const lists = [];
      querySnapshot.forEach((doc) => {
        let deleteEmailData = doc.data();
        deleteEmailData.id = doc.id;
        console.log(doc.id, " => ", doc.data());
        lists.push(deleteEmailData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteEmail2 = async (email) => {
    alert("Deleted" + email);
    try {
      // const deleteCollection = collection(db, "deletedMail");
      // const q = query(
      //   deleteCollection,
      //   where("from", "==", email || "to", "===", email)
      // );
      // const querySnapshot = await getDocs(q);
      // const lists = [];
      // querySnapshot.forEach(async (doc) => {
      //   console.log(doc.id, " => ", doc.data());
      //   let deleteEmailData = doc.data();
      //   deleteEmailData.id = doc.id;
      //   lists.push(deleteEmailData);
      // });
      const q = query(collection(db, "deletedMail"));
      const querySnapshot = await getDocs(q);
      //const lists = [];
      querySnapshot.forEach((doc) => {
        let deleteEmailData = doc.data();
        deleteEmailData.id = doc.id;
        console.log(doc.id, " => ", doc.data());
        //lists.push(deleteEmailData);
      });

      //setDeleteMailState(lists);
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteEmail = async () => {
    try {
      const deleteCollection = collection(db, "deletedMail");
      const q = query(deleteCollection, where("isDeleted", "==", true));
      const querySnapShot = await getDocs(q);
      const lists = [];
      querySnapShot.forEach((doc) => {
        console.log(doc.data());
        let deletedEmail = doc.data();
        deletedEmail.id = doc.id;
        lists.push(deletedEmail);
        //console.log("lists--- " + lists);
      });
      setDeletedEmail(lists);
      setEmailListings(lists);
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
            </button>
            <br />
            <button
              type="button"
              className=" mt-3 btn btn-primary position-relative"
              onClick={showDeleteEmail}
            >
              Deleted Mails
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
            <UserEmails
              emailListings={emailListings}
              handleDeleteEmail={handleDeleteEmail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailList;
