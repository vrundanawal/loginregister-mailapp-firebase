import { useCallback, useState } from "react";
import EmailComponet from "./EmailComponet";

const UserEmails = ({ emailListings }) => {
  console.log(emailListings);

  const [showComp, setShowComp] = useState(false);

  const ShowEmail = (e) => {
    e.preventDefault();

    setShowComp((prevState) => !prevState);
  };

  // const ShowEmail = useCallback(
  //   (user) => () => {
  //     console.log("UserEmail: ", user);
  //     const email = user.from;
  //     console.log(email);
  //     setShowComp((prevState) => !prevState);
  //   },

  //   []
  // );

  return (
    <>
      <form action="">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search in mails"
          />
        </div>
      </form>
      <table className="table table-hover">
        <tbody>
          {emailListings.map((user, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              className={`bold `}
              //onClick={ShowEmail(user)}
              onClick={ShowEmail}
            >
              <td>{user.from}</td>
              <td>{user.subject}</td>

              <td>{user.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showComp && <EmailComponet />}
    </>
  );
};

export default UserEmails;
