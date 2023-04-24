import { useNavigate } from "react-router-dom";

const UserEmails = ({ emailListings, handleDeleteEmail, showUserEmail }) => {
  //console.log(emailListings);
  //const [showComp, setShowComp] = useState(false);

  const navigate = useNavigate();

  // const showUserEmail = (user) => {
  //   console.log(user);
  //   alert(user.id);
  //   //setShowComp(true);
  //   navigate(`/mail/${user.id}`);
  //   // navigate(`/mail/${user.id}`);
  // };

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
      <table className="table table-hover">
        <thead>
          <tr>
            <th>From</th>
            {/* <th>To</th> */}
            <th>Subject</th>
            <th>Email Preview</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {emailListings.map((user) => (
            <tr
              key={user.id}
              style={{ cursor: "pointer" }}
              // className={`bold `}
              className={user.isRead === false ? "bold" : "null"}
              // onClick={() => ShowEmail(user.id)}
              // onClick={() => ShowEmail(user)}
            >
              {/* <td>{user.from}</td> */}
              <td>
                {user.fname} {user.lname}
                {/* {user.from} */}
              </td>
              {/* <td>{user.to}</td> */}
              <td>{user.subject}</td>

              <td>{user.body.slice(0, 20) + "..."}</td>

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
              <td>
                <i
                  className="fas fa-trash"
                  onClick={() => handleDeleteEmail(user.id)}
                ></i>
              </td>
              <td>
                <i
                  className="fas fa-eye"
                  onClick={() => showUserEmail(user)}
                  //onClick={() => handleShowUser(user)}
                ></i>
              </td>

              {/* <td>{convertTimeStamp(user.timeStamp)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserEmails;
