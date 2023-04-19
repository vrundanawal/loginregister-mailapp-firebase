import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setQuery(event.target.value);
  };

  return (
    <>
      <form action="">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search in mails"
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </>
  );
};

export default Search;
