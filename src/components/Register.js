import React from "react";

const Register = () => {
  return (
    <>
      <div className="  bg-light rounded-3 col-md-6 mx-auto">
        <div className="container-fluid py-5">
          <h5 className="fw-bold">Register Form</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input type="name" className="form-control" />
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" />
              {/* <div className="form-text">Please Enter your Email</div> */}
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              <label htmlFor="City" className="form-label">
                City
              </label>
              <input type="text" className="form-control" />
              <label htmlFor="PhoneNumber" className="form-label">
                Phone Number
              </label>
              <input type="number" className="form-control" />
            </div>

            <div className="btn btn-primary mx-2">Register</div>
            {/* <button type="submit" className="btn btn-primary">
              Login
            </button> */}
          </form>
        </div>
      </div>

      <div className=""></div>
    </>
  );
};

export default Register;
