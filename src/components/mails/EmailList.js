import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
//import UserContext from "../../context/UserContext";
import Modal from "./Modal";
import UserEmails from "./UserEmails";

const EmailList = ({ userDetails }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  //const userData = useContext(UserContext);
  //console.log(userData);
  console.log(userDetails);

  useEffect(() => {
    if (!userDetails.email) {
      navigate("/login");
    } else {
      getUser();
    }
  });

  const getUser = async () => {
    try {
      const mailRef = doc(db, "mails", userDetails.email);
      const docsSnap = await getDocs(mailRef);
      docsSnap.forEach((doc) => {
        console.log(doc.data());
      });

      db.collection("mails/" + userDetails.email + "/DocSubCollectionName")
        .get()
        .then((subCollectionSnapshot) => {
          subCollectionSnapshot.forEach((subDoc) => {
            console.log(subDoc.data());
          });
        });
      // console.log(doc(db, "mails", userDetails.email));
      // const docSnap = await getDoc(doc(db, "mails", userDetails.email));
      // const userEmails = docSnap.data();

      //console.log(userEmails);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-12">
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
              <UserEmails userEmail={userDetails.email} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailList;
