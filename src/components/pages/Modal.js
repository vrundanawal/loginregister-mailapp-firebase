import React from "react";

const Modal = ({ open, onCloseModal }) => {
  if (!open) return null;
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
                <input type="text" className="form-control-plaintext" />
              </div>

              <label className="col-sm-2">Subject:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" />
              </div>
              <textarea
                name=""
                className="form-control-plaintext"
                id=""
                cols="30"
                rows="5"
              ></textarea>
              <hr />
              <div>
                <button className="btn btn-dark">Sent</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
