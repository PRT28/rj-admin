import React, { useState } from "react";
import axios from "axios";
import { AUTH_API } from "../../util/api";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Register from "./Register";
import { loadAdmin } from "../../slices/adminSlice";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

function Login() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["token"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, loadRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handles validation, and authenticate with API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      setLoading(true);
      try {
        const response = await axios({
          method: "post",
          url: AUTH_API.login,
          data: {email, password},
        });

        if (response.status == 200) {
          dispatch(loadAdmin(response.data.user));
          setCookie("token", response.data.token);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log(e?.response?.data?.msg)
        setError(e?.response?.data?.msg);
      }
    }
  };
  const toggleNavbar = (e) => {
    console.log(e.target);
    return false;
  };

  // if (register) return <Register loadRegister={loadRegister} />;

  return (
    <section>
      <div className="container-fluid  ">
        <div className="row d-flex justify-content-center align-items-center vh-100 ">
        <div className="d-none d-lg-block">
        <nav className="navbar  navbar-expand-lg navbar-light bg-transparent position-fixed m-3 mx-5 postition-absolute-lg fixed-top m-5-lg border-5 w-auto text-dark rounded">
            <a className="navbar-brand px-4 text-light" href="#">
              Logo
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse w-f" id="navbarText">
              <ul className="navbar-nav d-flex justify-content-between ms-auto px-4">
                <li className="nav-item h2 active">
                  <a className="nav-link" href="#">
                    <p className="h5" style={{ color: "white" }}>
                      Support
                    </p>
                  </a>
                </li>
                <li className="nav-item h2">
                  <a className="nav-link " href="#">
                    <p className="h5" style={{ color: "white" }}>
                      Terms
                    </p>
                  </a>
                </li>
                <li className="nav-item h2">
                  <a className="nav-link" href="#">
                    <p className="h5" style={{ color: "white" }}>
                      Privacy
                    </p>
                  </a>
                </li>
                {/* <li className="nav-item h2 active">
                  <button
                    className="nav-link"
                    onClick={() => loadRegister(true)}
                  >
                    <p className="h5" style={{ color: "white" }}>
                      Register
                    </p>
                  </button>
                </li> */}
              </ul>
            </div>
          </nav>
          </div>
          <div
            className=" col-md-6  h-100 align-items-center d-flex justify-content-center"
            style={{ backgroundColor: "#3C8C7E" }}
          >
            {loading ? (
              <div
                className="spinner-border"
                style={{ width: "3rem", height: "3rem", color: "white" }}
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <form className="w-50">
                <label
                  className="h3 m-4 mx-0 mb-4 text-light"
                  htmlFor="form3Example3"
                >
                  LOGIN
                </label>
                <div className=" form-outline mb-3 ">
                  <label
                    className="form-label h5 text-light"
                    htmlFor="form3Example3"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="form3Example3"
                    className="form-control form-control-lg border-1 border-dark"
                    maxLength="256"
                    style={{ fontSize: "15px", borderRadius: "15px" }}
                    placeholder="Your email here"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-3 ">
                  <label
                    className="form-label h5 text-light"
                    htmlFor="form3Example4"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="form3Example4"
                    className="form-control form-control-lg border-1 border-dark"
                    minLength="8"
                    style={{ fontSize: "15px", borderRadius: "15px" }}
                    placeholder="Your password here"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2 w-100">
                  <button
                    type="button"
                    className="btn  btn-lg w-100"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                      border: "1px solid white",
                    }}
                    onClick={(e) => handleSubmit(e)}
                    disabled={
                      email && password ? false : true
                    }
                  >
                    <p className="h4 text-light">Login</p>
                  </button>
                  {error && <p className="text-danger mt-2">{error}</p>}
                </div>
              </form>
            )}
          </div>
          <div
            className="col-md-6 h-100 d-flex "
            style={{ backgroundColor: "#3C8C7E" }}
          >
            <img
              src="https://images.unsplash.com/photo-1557754897-ca12c5049d83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
              className="rounded object-fit-cover d-block w-100 d-none d-sm-block "
              alt="Sample image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
