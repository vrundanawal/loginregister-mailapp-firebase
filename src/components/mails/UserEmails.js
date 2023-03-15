const UserEmails = ({ emailListings }) => {
  console.log(emailListings);
  return (
    <>
      <table className="table table-hover">
        <tbody>
          {emailListings.map((user, index) => (
            <tr key={index}>
              <td>{user.from}</td>
              <td>{user.subject}</td>

              <td>{user.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserEmails;
