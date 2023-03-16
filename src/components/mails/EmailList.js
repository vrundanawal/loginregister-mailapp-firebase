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

  //const [id, setId] = useState([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMails = async (email) => {
    try {
      const mailCollection = collection(db, "mailsnew");
      const q = query(mailCollection, where("to", "==", email));
      const querySnapShot = await getDocs(q);
      const lists = [];
      //const IDS = [];
      querySnapShot.forEach((doc) => {
        console.log(doc.id);
        let emailData = doc.data();

        emailData.id = doc.id;
        //lists.push(doc);
        lists.push(emailData);

        // const a = doc.data();

        //lists.push(doc.id, doc.data());
        //IDS.push(doc.id);
        console.log(emailData);
        //console.log(doc.id, "=>", doc.data());
      });

      setEmailListings(lists);

      // querySnapShot.forEach((doc) => {
      //   const ids = [doc.id];
      //   //console.log(ids);
      //   const userEmails = [doc.data()];
      //   // console.log(userEmails);
      //   //lists.push(doc);
      //   for (var i = 0; i < userEmails.length; i++) {
      //     // lists.push({id[i] : userEmails[i]})
      //     lists.push({ [ids[i]]: userEmails[i] });
      //   }
      //   //console.log(lists);
      //   setEmailListings(lists);
      //   //lists.push(doc.data());
      //   //IDS.push(doc.id);
      //   //console.log(doc.id, "=>", doc.data());
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
