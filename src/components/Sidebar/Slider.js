import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loadAdmin, getSTate } from "../../slices/adminSlice";
import { Outlet } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

function Slider({ children }) {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { loading, data } = useSelector((store) => store.admin);
  console.log(data);

  const [submenuJoy, setSubmenuJoy] = useState(false);
  const [submenuPuzzle, setSubmenuPuzzle] = useState(false);
  const [submenuSetting, setSubmenuSetting] = useState(false);
  const [submenuWhack, setSubmenuWhack] = useState(false);
  // const {data,loading}=useSelector((store)=> store.admin)
  // console.log(data,loading)


  const logout = () => {
    removeCookie("token");
  };

  const toggleSelect = (event) => {
    console.log("From Slider", event);
    // const target = document.querySelector(`#${id}`);
    // console.log(target);
    // event.target.classList.push('active');
  };
  // dispatch(getSTate())
  const toggleJoy = () => setSubmenuJoy(!submenuJoy);
  const togglePuzzle = () => setSubmenuPuzzle(!submenuPuzzle);
  const toggleSetting = () => setSubmenuSetting(!submenuSetting);
  const toggleWhack = () => setSubmenuWhack(!submenuWhack);
  return (
    <div className=" container-fluid " style={{ backgroundColor: "white" }}>
      <div className="row">
          <Navbar className="d-block d-sm-none border-1" expand="md" style={{ backgroundImage: "linear-gradient(to right, white ,#3C8C7E )", border:"1px solid black"}}>
            <Container>
              <Navbar.Brand href="#home">Random Joy</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/user">User</Nav.Link>
                  
                  <NavDropdown title="Joy" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/joy/add">
                      Add Joy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/joy/manage">
                      Manage Joy
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/category">Category</Nav.Link>
                  <Nav.Link href="/keyword">Keyword</Nav.Link>
                  <NavDropdown title="Puzzle" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/puzzle/add">
                      Add Puzzle
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/puzzle/manage">
                      Manage Puzzle
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Whack" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/whack/add">
                      Add Whack
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/whack/manage">
                      Manage Whack
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/commitment">Commitment</Nav.Link>
                  <Nav.Link href="/statement">Statement</Nav.Link>
                  <Nav.Link href="/report">Report</Nav.Link>
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/setting/application">
                      Application Settings
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/setting/faq">
                      FAQ
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/setting/about">
                      About Us
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/setting/termscondition">
                      Terms & conditions
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        <div
          className="d-none d-sm-block col-auto col-md-2 min-vh-100 d-flex flex-column"
          style={{ backgroundColor: "#3C8C7E" }}
        >
          <div className="mt-4">
            <a
              className="text-decolration-none text-white d-non d-sm-inline d-flex align-item-center  mt-4"
              style={{ textDecoration: "none" }}
            >
              <span className="ms-1 fs-4 d-none d-sm-inline text-white p-4 ">
                Random Joy
              </span>
            </a>
          </div>
          <div>
            <ul className="nav flex-column pt-4">
              <li
                className="nav-item text-light fs-4 p-1"
                id="dashboard"
                onClick={() => toggleSelect()}
              >
                <Link
                  to="/dashboard"
                  className="nav-link text-light"
                  area-current="page"
                >
                  <span className="ms-2 d-none d-sm-inline h5 text-light">
                    <i
                      className="fa-solid fa-bars me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Dashboard
                  </span>
                </Link>
              </li>

              <li
                className="nav-item text-white fs-4 p-1"
                id="user"
                onClick={() => toggleSelect()}
              >
                <Link to="/user" className="nav-link" area-current="page">
                  <span className="ms-2 d-none d-sm-inline text-light h5 ">
                    <i
                      className="fa-solid fa-user me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    User
                  </span>
                </Link>
              </li>
              <li
                className="nav-items text-white fs-4 p-1 has-submenu "
                id="joy"
                onClick={() => toggleSelect()}
              >
                <button className="nav-link" onClick={toggleJoy}>
                  <span className="ms-2 d-none d-sm-inline text-light h5 ">
                    <i
                      className="fas fa-list-ul me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Joy
                  </span>
                </button>
                <ul
                  className={`submenu ${submenuJoy ? "ms-4 h5 " : "collapse"}`}
                >
                  <li style={{ color: "white" }}>
                    <Link
                      to="/joy/add"
                      className="nav-link "
                      area-current="page"
                    >
                      <span className=" d-none d-sm-inline text-light h6 fw-light">
                        Add Joy
                      </span>
                    </Link>
                  </li>
                  <li style={{ color: "white" }}>
                    <Link
                      to="/joy/manage"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className="d-none d-sm-inline text-light h6 fw-light">
                        Manage Joy
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="nav-items text-white fs-4 p-1"
                id="category"
                onClick={() => toggleSelect()}
              >
                <Link to="/category" className="nav-link" area-current="page">
                  <span className="ms-2 d-none d-sm-inline text-light h5">
                    <i
                      className="fas fa-clipboard-list me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Category
                  </span>
                </Link>
              </li>

              <li
                className="nav-items text-white fs-4 p-1"
                id="keyword"
                onClick={() => toggleSelect()}
              >
                <Link to="/keyword" className="nav-link" area-current="page">
                  <span className="ms-2 d-none d-sm-inline text-light h5">
                    <i
                      className="fas fa-align-left me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Keyword
                  </span>
                </Link>
              </li>

              <li
                className="nav-items text-white fs-4 p-1 has-submenu "
                id="puzzle"
                onClick={() => toggleSelect()}
              >
                <button className="nav-link" onClick={togglePuzzle}>
                  <span className="ms-2 d-none d-sm-inline text-light h5">
                    <i
                      className="fas fa-comment me-3 bg-light p-2 rounded mt-"
                      style={{ color: "#000000" }}
                    ></i>
                    Puzzle
                  </span>
                </button>
                <ul
                  className={`submenu ${
                    submenuPuzzle ? "ms-4 h5 " : "collapse"
                  }`}
                >
                  <li style={{ color: "white" }}>
                    <Link
                      to="/puzzle/add"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className=" d-none d-sm-inline text-light h6 fw-light">
                        Add Puzzle
                      </span>
                    </Link>
                  </li>
                  <li style={{ color: "white" }}>
                    <Link
                      to="/puzzle/manage"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className=" d-none d-sm-inline text-light h6 fw-light">
                        Manage Puzzle
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className="nav-items text-white fs-4 p-1 has-submenu "
                id="whack"
                onClick={() => toggleSelect()}
              >
                <button className="nav-link" onClick={toggleWhack}>
                  <span className="ms-2 d-none d-sm-inline text-light h5 ">
                    <i
                      className="fab fa-solid fa-wikipedia-w me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Whack
                  </span>
                </button>
                <ul
                  className={`submenu ${
                    submenuWhack ? "ms-4 h5 " : "collapse"
                  }`}
                >
                  <li style={{ color: "white" }}>
                    <Link
                      to="/whack/add"
                      className="nav-link "
                      area-current="page"
                    >
                      <span className=" d-none d-sm-inline text-light h6 fw-light">
                        Add Whack
                      </span>
                    </Link>
                  </li>
                  <li style={{ color: "white" }}>
                    <Link
                      to="/whack/manage"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className="d-none d-sm-inline text-light h6 fw-light">
                        Manage Whack
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="nav-items text-white fs-4 p-1"
                id="commitment"
                onClick={() => toggleSelect()}
              >
                <Link to="/commitment" className="nav-link" area-current="page">
                  <span className="ms-2 d-none d-sm-inline text-light h5">
                    <i
                      className="fas fa-align-left me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Commitment
                  </span>
                </Link>
              </li>

              <li
                className="nav-items text-white fs-4 p-1"
                id="commitment"
                onClick={() => toggleSelect()}
              >
                <Link to="/statement" className="nav-link" area-current="page">
                  <span className="ms-2 d-none d-sm-inline text-light h5">
                    <i
                      className="fas fa-book me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Statement
                  </span>
                </Link>
              </li>
              <li
                className="nav-items text-white fs-4 p-1"
                id="commitment"
                onClick={() => toggleSelect()}
              >
                <Link to="/report" className="nav-link" area-current="page">
                  <span className="ms-2 d-none d-sm-inline text-light h5">
                    <i
                      className="fa-solid fa-triangle-exclamation me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Report
                  </span>
                </Link>
              </li>

              <li
                className="nav-items text-white fs-4 p-1 has-submenu"
                id="setting"
                onClick={() => toggleSelect()}
              >
                <button className="nav-link" onClick={toggleSetting}>
                  <span className="ms-2 d-none d-sm-inline text-light h5">
                    <i
                      className="fas fa-cog me-3 bg-light p-2 rounded"
                      style={{ color: "#000000" }}
                    ></i>
                    Settings
                  </span>
                </button>
                <ul
                  className={`submenu ${
                    submenuSetting ? "ms-4 h5 " : "collapse"
                  }`}
                >
                  <li style={{ color: "white" }}>
                    <Link
                      to="/setting/application"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className="d-none d-sm-inline text-light h6 fw-light">
                        Application Settings
                      </span>
                    </Link>
                  </li>
                  <li style={{ color: "white" }}>
                    <Link
                      to="/setting/faq"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className="d-none d-sm-inline text-light h6 fw-light">
                        FAQ
                      </span>
                    </Link>
                  </li>
                  <li style={{ color: "white" }}>
                    <Link
                      to="/setting/about"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className="d-none d-sm-inline text-light h6 fw-light">
                        About Us
                      </span>
                    </Link>
                  </li>
                  <li style={{ color: "white" }}>
                    <Link
                      to="/setting/termscondition"
                      className="nav-link"
                      area-current="page"
                    >
                      <span className=" d-none d-sm-inline text-light h6 fw-light">
                        Terms & conditions
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="col-md-10 "
          style={{
            backgroundImage: "linear-gradient(to right, white ,#3C8C7E )",
          }}
        >
          <div className=" row">
            <ul className="col-md-6 nav flex-row ">
              <li className="nav-items text-dark fs-4 pt-5 pb-3 ps-5 d-flex align-items-center justify-content-center">
                <Link className="navbar-brand">
                  <img
                    src="https://www.pngitem.com/pimgs/m/24-248309_transparent-profile-clipart-font-awesome-user-circle-hd.png"
                    width="35"
                    height="35"
                    className="d-inline-block align-top rounded-circle m-1 me-3"
                    alt=""
                  />
                  Hi, {!loading && data ? data.username : "Admin"}
                </Link>
              </li>
            </ul>
            <ul className="col-md-6 nav flex-row flex-row-reverse pe-5 ">
              <li className="d-none d-sm-block nav-items text-light fs-4 pt-5 pb-3 ps-5 ">
                <button
                  type="button"
                  className="btn btn-dark btn-lg border-2 px-5"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#3C8C7E",
                    border: "black solid ",
                    borderColor: "white",
                  }}
                  onClick={logout}
                >
                  <p className="h5 " style={{ color: "white" }}>
                    Logout
                  </p>
                </button>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className=" w-100 h-100">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
