import { useState } from "react";

const UserEmails = ({ emailListings }) => {
  console.log(emailListings);

  const [showComp, setShowComp] = useState(false);

  const ShowEmail = () => {
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
  // let timeStamp = 1678793645420;
  const convertTimeStamp = (timeStamp) => {
    var date = new Date(+timeStamp);
    // console.log(date.toDateString());
    // console.log(date.toDateString());
    // console.log(date.getFullYear());
    // console.log(date.getMinutes());
    // console.log(date.getSeconds());
    // console.log(date.getHours());
    // console.log(date.toLocaleTimeString());

    // return date.toDateString() + " " + date.toLocaleTimeString();
    return date.toDateString();
  };

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
          {emailListings.map((user) => (
            <tr
              key={user.id}
              style={{ cursor: "pointer" }}
              // className={`bold `}
              className={user.isRead === false ? "bold" : "null"}
              onClick={ShowEmail}
              // onClick={ShowEmail}
            >
              <td>{user.from}</td>
              {/* <td>{user.fname}</td> */}
              <td>{user.subject}</td>

              <td>{user.body}</td>
              <td>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(user.timeStamp)}
              </td>

              {/* <td>{convertTimeStamp(user.timeStamp)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {showComp && <>Hello</>}
    </>
  );
};

export default UserEmails;
