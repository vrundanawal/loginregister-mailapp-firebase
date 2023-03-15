import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../../firebase.config";

const Modal = ({ openModal, onCloseModal, userEmail }) => {
  const [toAddress, setToAddress] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const onChangeBody = (e) => {
    setBody(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const onChangeToAddress = (e) => {
    setToAddress([e.target.value]);
  };

  //send the mail and store into Db
  const handleSendMail = () => {
    const timeStamp = new Date().getTime().toString();
    const mails = {
      timeStamp,
      from: userEmail,
      subject,
      body,
      isRead: false,
    };
    //console.log(mails);

    try {
      if (toAddress.length > 0 && subject && body) {
        toAddress.map(async (item) => {
          mails.to = item;
          //const mailCollectionref = doc(db, "mails", item);
          const mailCollectionref = collection(db, "mailsnew");
          await addDoc(mailCollectionref, mails);
          onCloseModal();
        });
      } else {
        alert("All the fields are required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!openModal) return null;
  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content ">
          <div
            className="modal-header bg-light"
            style={{ padding: "0.3rem 0.3rem" }}
          >
            <p className="">New Message</p>
            <button
              type="button"
              className="btn-close"
              onClick={onCloseModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <label className="col-sm-2 ">To :</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  onChange={onChangeToAddress}
                  className="form-control-plaintext"
                  name="to"
                />
              </div>

              <label className="col-sm-2">Subject:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  name="subject"
                  onChange={onChangeSubject}
                />
              </div>
              <textarea
                name="body"
                className="form-control-plaintext"
                cols="30"
                rows="5"
                onChange={onChangeBody}
              ></textarea>
              <hr />
              <div>
                <button className="btn btn-primary" onClick={handleSendMail}>
                  Sent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
