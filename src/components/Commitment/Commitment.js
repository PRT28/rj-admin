import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMITMENT_API } from "../../util/api";
import { useCookies } from "react-cookie";
import { loadCommitment } from "../../slices/commitmentSlice";
import DataTable from "../DataTable";
import axios from "axios";

const Commitment = () => {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  const [commitment, setCommitment] = useState({
    commitment_statement: 0,
    commitment_text: "",
  });

  const commitmentDelete = async (e, elem) => {
    try {
      const response = await axios({
        method: "delete",
        url: COMMITMENT_API.deleteCommitment + `/${elem._id}`,
      });
      if (response.status === 200)
        return dispatch(loadCommitment(response.data));
    } catch (error) {
      console.log(error, error.response);
    }
  };

  const fetchCommitment = async () => {
    try {
      const response = await axios({
        method: "get",
        url: COMMITMENT_API.getAllCommitment,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status == 200) dispatch(loadCommitment(response.data));
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchCommitment();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "post",
        url: COMMITMENT_API.createCommitment,
        headers: {
          Authorization: cookies.token,
        },
        data: commitment,
      });
      if (response.status == 201) {
        setCommitment({ ...commitment, commitment_text: "" });
        return dispatch(loadCommitment(response.data));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const { data: commitmentData, loading } = useSelector(
    (store) => store.commitment
  );

  const fields = ["commitment_text", "user_id"];

  return (
    <div className="dashboard container mb-5 ">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">
          Commitment
        </span>
      </div>
      <div className="flex-row ">
        <div
          className="flex-row col-sm card  border shadow-lg p-5 h-100"
          style={{ borderRadius: "20px" }}
        >
          <div className=" col-md-6  align-items-center d-flex justify-content-center">
            <form className="" onSubmit={(e) => handleSubmit(e)}>
              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="form3Example3">
                  Commitment
                </label>
                <input
                  type="text"
                  name="commitment_text"
                  id="form3Example3"
                  value={commitment.commitment_text}
                  onChange={(e) =>
                    setCommitment({
                      ...commitment,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="form-control form-control-lg border-1 border-dark"
                  maxLength="256"
                  style={{ fontSize: "15px", borderRadius: "15px" }}
                />
              </div>
              <div className="text-center text-lg-start mt-4 pt-2 w-100">
                <button
                  type="submit"
                  className="btn  btn-lg w-100"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    borderRadius: "20px",
                    backgroundColor: "#3C8C7E",
                  }}
                >
                  <p className="h4 text-light">Submit</p>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6   align-items-center d-flex justify-content-center ">
            <img
              src="https://i.pinimg.com/564x/79/73/0c/79730c5f6d3f40e6610ecaf6315672be.jpg"
              className="img-fluid  w-50 d-none d-sm-block "
              alt="Sample image"
            />
          </div>
        </div>
      </div>

      {/* DataTable to show the commitments */}
      <div>
        <div style={{ borderRadius: "20px" }}>
          {!loading && commitmentData ? (
            <DataTable
              actualData={commitmentData}
              delete_func={commitmentDelete}
              fields={fields}
              action={loadCommitment}
              // editableFields={{
              //   component: "commitment",
              //   editArray: ["commitment_text"],
              // }}
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
    </div>
  );
};

export default Commitment;
