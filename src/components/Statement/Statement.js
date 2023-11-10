import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATEMENT_API } from "../../util/api";
import { useCookies } from "react-cookie";
import { loadStatement } from "../../slices/statementSlice";
import DataTable from "../DataTable";
import axios from "axios";

const Statement = () => {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  const [statement, setStatement] = useState({
    commitment_statement: 1,
    commitment_text: "",
  });

  const statementDelete = async (e, elem) => {
    try {
      const response = await axios({
        method: "delete",
        url: STATEMENT_API.deleteStatment + `/${elem._id}`,
      });
      if (response.status === 200)
        return dispatch(loadStatement(response.data));
    } catch (error) {
      console.log(error, error.response);
    }
  };

  // Fetch All Statement
  const fetchStatement = async () => {
    try {
      const response = await axios({
        method: "get",
        url: STATEMENT_API.getAllStatement,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status == 200) dispatch(loadStatement(response.data));
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchStatement();
  }, [dispatch]);

  // Create New Statement
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "post",
        url: STATEMENT_API.createStatement,
        headers: {
          Authorization: cookies.token,
        },
        data: statement,
      });
      if (response.status == 201) {
        setStatement({ ...statement, commitment_text: "" });
        return dispatch(loadStatement(response.data));
      }
    } catch (e) {
      console.warn(e, e.response);
    }
  };

  const { data: statementData, loading } = useSelector(
    (store) => store.statement
  );

  const fields = ["commitment_text", "user_id"];

  return (
    <div className="dashboard container mb-5 ">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">
          Statement
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
                <label className="form-label h5" htmlFor="statementText">
                  Statement
                </label>
                <input
                  type="text"
                  name="commitment_text"
                  id="statementText"
                  value={statement.commitment_text}
                  onChange={(e) =>
                    setStatement({
                      ...statement,
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
          <div className="col-md-6  align-items-center d-flex justify-content-center  ">
            <img
              src="https://i.pinimg.com/564x/5c/e8/94/5ce8942d0bdd02eabc3ce93b256cb3b8.jpg"
              className="img-fluid w-50 d-none d-sm-block "
              alt="Sample image"
            />
          </div>
        </div>
      </div>

      {/* DataTable to show the statements */}
      <div>
        <div style={{ borderRadius: "20px" }}>
          {!loading && statementData ? (
            <DataTable
              actualData={statementData}
              delete_func={statementDelete}
              fields={fields}
              action={loadStatement}
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

export default Statement;
