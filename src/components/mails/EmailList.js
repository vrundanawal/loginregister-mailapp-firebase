import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase.config";
//import UserContext from "../../context/UserContext";
import Modal from "./Modal";

const EmailList = ({ email }) => {
  const [openModal, setOpenModal] = useState(false);
  //const userData = useContext(UserContext);
  //console.log(userData);

  // const getUser = async () => {
  //   try {
  //     const docSnap = await getDoc(doc(db, "mails", email));
  //     const docSnapUser = await getDoc(doc(db, "users", email));
  //     console.log(docSnap.data());
  //     const firstName = docSnapUser.data();
  //     console.log(firstName.fname);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <h2>Hello </h2>
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
              userEmail={email}
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
    </>
  );
};

export default EmailList;
