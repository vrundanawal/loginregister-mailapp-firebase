import React, { useState } from "react";

const Search = ({ emailListings }) => {
  //console.log("emailListings", emailListings);
  const [query, setQuery] = useState("");

  const handleInputSearch = (event) => {
    //console.log(event.target.value);
    setQuery(event.target.value);
  };

  const filterSearch = emailListings.filter((person) => {
    // console.log(
    //   person.fname.toLowerCase().includes(query.toLowerCase()) ||
    //     person.from.toLowerCase().includes(query.toLowerCase()) ||
    //     person.subject.toLowerCase().includes(query.toLowerCase())
    // );
    return (
      person.fname.toLowerCase().includes(query.toLowerCase()) ||
      person.from.toLowerCase().includes(query.toLowerCase()) ||
      person.subject.toLowerCase().includes(query.toLowerCase()) ||
      person.body.toLowerCase().includes(query.toLowerCase()) ||
      person.lname.toLowerCase().includes(query.toLowerCase())
    );
  });

  console.log("filterSearch", filterSearch);

  return (
    <>
      <form action="">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search in mails"
            // value={query}
            onChange={handleInputSearch}
            // query={query}
            // filterSearch={filterSearch}
          />
        </div>
      </form>
    </>
  );
};

export default Search;
