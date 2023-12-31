import React, { useState } from "react";
import axios from "axios";
import { AUTH_API } from "../../util/api";
import { useDispatch } from "react-redux";
import { loadAdmin } from "../../slices/adminSlice";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { Button } from "react-bootstrap";

function Register({ loadRegister, data, fetchUsers, closeModal }) {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);

  const [registerData, setRegisterData] = useState({
    username: data ? data.username : "",
    email: data ? data.email : "",
    password: data ? data.password : "",
    gender: data ? data?.gender : "other",
    zip_code: data ? data.zip_code : "",
    role: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    let numericValue;
    // Validate zip_code to only get the numeric Value
    if (name === "zip_code") numericValue = e.target.value.replace(/\D/g, "");
    setRegisterData({
      ...registerData,
      [name]: name === "zip_code" ? numericValue : e.target.value,
    });
  };
  const admin = jwtDecode(cookies.token).user;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (data) {
      if (data.role < admin.role)
        alert("You cant modify admins above or equal your hierarchy");
      try {
        const response = await axios({
          method: "patch",
          url: `${AUTH_API.update}/${data._id}`,
          data: registerData,
          headers: {
            Authorization: cookies["token"],
          },
        });
        console.log(response);

        // dispatch(loadAdmin(response.data._doc));
        // setCookie('token',response.data.tokeconsole.log(e);n);
        await fetchUsers();
        setLoading(false);
        loadRegister(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    } else {
      try {
        if (registerData.role <= admin.role)
          alert("You cant modify admins above or equal your hierarchy");
        const response = await axios({
          method: "post",
          url: AUTH_API.register,
          data: registerData,
        });

        dispatch(loadAdmin(response.data._doc));
        // setCookie('token',response.data.tokeconsole.log(e);n);
        setLoading(false);

        loadRegister(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    }

    setRegisterData({
      username: "",
      email: "",
      password: "",
      gender: "",
      zip_code: "",
      role: 1,
    });
  };

  return (
    <div className="p-md-5 m-5 text-black">
      <h3 className="mb-5 text-uppercase">Registration form</h3>
      {/* SetLoading state when processing  */}
      {loading ? (
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="username"
              id="name"
              className="form-control form-control-lg"
              value={registerData.username}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control form-control-lg"
              value={registerData.email}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Role
            </label>
            <input
              type="number"
              name="role"
              id="role"
              className="form-control form-control-lg"
              value={registerData.role}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control form-control-lg"
            value={registerData.password}
            onChange={(e) => handleChange(e)}
            required={true}
          />
          <div className="d-md-flex justify-content-start align-items-center mt-4 mb-4 py-2">
            <h6 className="mb-0 me-4">Gender: </h6>

            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="femaleGender"
                value="female"
                defaultChecked={data?.gender?.toLowerCase() === "female"}
                onChange={(e) => handleChange(e)}
              />
              <label className="form-check-label" htmlFor="femaleGender">
                Female
              </label>
            </div>

            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="maleGender"
                value="male"
                defaultChecked={data?.gender?.toLowerCase() === "male"}
                onChange={(e) => handleChange(e)}
              />
              <label className="form-check-label" htmlFor="maleGender">
                Male
              </label>
            </div>

            <div className="form-check form-check-inline mb-0">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="otherGender"
                value="other"
                defaultChecked={
                  data?.gender?.toLowerCase() !== "male" ||
                  data?.gender?.toLowerCase() !== "female"
                }
                onChange={(e) => handleChange(e)}
              />
              <label className="form-check-label" htmlFor="otherGender">
                Other
              </label>
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="pincode">
              Pincode
            </label>
            <input
              type="text"
              maxLength={6}
              name="zip_code"
              id="pincode"
              className="form-control form-control-lg"
              value={registerData.zip_code}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>
          <div className="d-flex ">
            <div className="d-flex justify-content-end pt-3">
              <button
                type="submit"
                className="btn btn-lg ms-2 text-light"
                style={{ backgroundColor: "#3C8C7E" }}
              >
                {data ? "Update" : "Register"}
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
            <div className="d-flex justify-content-end pt-3">
              <button
                className="btn  ms-2 text-light"
                style={{ backgroundColor: "grey" }}
                onClick={closeModal}
              >
                Go Back
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
export default Register;
