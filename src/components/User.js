import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../slices/userSlice";
import { USER_API } from "../util/api";
import DataTable from "./DataTable";
import { useCookies } from "react-cookie";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Register from './Auth/Register';

function User() {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  
  const [show, setShow] = useState(false);

  const fetchApi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: USER_API,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status === 200) return dispatch(loadUser(response.data));
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  // get the data from the state.
  const { loading, data: userData } = useSelector((state) => state.user);
  const {data: adminData} = useSelector(state => state.admin)
  const fields = ["username", "email", "status", "zip_code", "gender", "role"];
  
  return (
    <div className="dashboard container vh-100" style={{overflow: 'scroll'}}>
      <div className="row mt-4  d-flex">
        <div className="col-sm-6 align-items-center d-flex ">
          <span className="d-none text-sm text-light d-sm-inline h5">User</span>
        </div>

        <div className="col-sm-6 d-flex flex-row-reverse px-5">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="btn btn-lg border-2 px-5"
              style={{
                borderRadius: "20px",
                backgroundColor: "#494949",
                borderColor: "white",
              }}
            >
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Role 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Role 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Role 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {adminData.role === 0 && <button
            type="button"
            className="btn btn-light btn-lg border-2 px-5"
            style={{
              borderRadius: "20px",
              backgroundColor: "#494949",
              borderColor: "white",
              marginRight: '10px'
            }}
            onClick={() => setShow(true)}
          >
            <p className="h5 text-light">
              <i
                className="fas fa-plus mx-2"
                style={{ color: "#ffffff" }}
              ></i>
              Add
            </p>
          </button>}
        </div>
      </div>
      <div className="row">
        <div className=" ">
          {!loading && userData ? (
            <DataTable
              actualData={userData}
              fields={fields}
              editableFields={[""]}
            />
          ) : (
            <div className="align-items-center d-flex justify-content-center pt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Register loadRegister={setShow} />
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default User;
