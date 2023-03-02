import React, { useState } from "react";

const Home = () => {
  const [state, setState] = useState("test");
  const changeState = () => {
    setState("test12");
  };
  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Gmail App</h1>
          <p className="col-md-8 fs-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            impedit officia tempora saepe itaque iusto inventore illum delectus!
            Nobis excepturi culpa error perferendis dolore earum?
          </p>
          <button onClick={changeState}>change state {state}</button>
        </div>
      </div>
    </>
  );
};

export default Home;
