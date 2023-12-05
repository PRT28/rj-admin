import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMITMENT_API } from "../../util/api";
import { useCookies } from "react-cookie";
import { loadCommitment } from "../../slices/commitmentSlice";
import { loadCategory } from "../../slices/categorySlice";
import { CATEGORY_API } from "../../util/api";
import DataTable from "../DataTable";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Commitment = () => {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const [commitment, setCommitment] = useState({
    is_commitment: 0,
    suggestion_text: "",
    category_text: "",
  });

  const { loading: categoryLoading, data: categoryData } = useSelector(
    (state) => state.category
  );

  const fetchCommitment = async () => {
    try {
      const response = await axios({
        method: "get",
        url: COMMITMENT_API.getAllCommitment,
        headers: {
          Authorization: cookies.token,
        },
      });
      console.log("dsadasdas", response);
      if (response.status == 200) dispatch(loadCommitment(response.data));
    } catch (e) {
      console.warn(e);
    }
  };

  const commitmentDelete = async (e, elem) => {
    try {
      const response = await axios({
        method: "delete",
        url: COMMITMENT_API.deleteCommitment + `/${elem._id}`,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status === 200) fetchCommitment();
    } catch (error) {
      console.log(error, error.response);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios({
        method: "get",
        url: CATEGORY_API.getAllCategory,
        headers: {
          Authorization:
            // cookies.token,
            cookies.token,
        },
      });
      // Dispatch the data to the puzzleSlice to be stored in the store
      return dispatch(loadCategory(response.data));
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchCommitment();
    fetchCategories();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data) {
      try {
        if (data.category_id === "" || data.suggestion_text === "") {
          alert("Make sure to write a text and select a catgory");
          return;
        }
        const response = await axios({
          method: "put",
          url: `${COMMITMENT_API.updateCommitment}/${data.id}`,
          headers: {
            Authorization: cookies.token,
          },
          data: commitment,
        });
        if (response.status == 201) {
          setCommitment({
            ...commitment,
            suggestion_text: "",
            category_text: "",
          });
          // dispatch(loadCommitment(response.data));
          await fetchCommitment();

          setShow(false);
          setData(null);
          return;
        }
      } catch (e) {
        console.warn(e);
      }
    } else {
      try {
        if (
          commitment.category_text === "" ||
          commitment.suggestion_text === ""
        ) {
          alert("Make sure to write a text and select a catgory");
          return;
        }
        const response = await axios({
          method: "post",
          url: COMMITMENT_API.createCommitment,
          headers: {
            Authorization: cookies.token,
          },
          data: commitment,
        });
        if (response.status == 201) {
          setCommitment({
            ...commitment,
            suggestion_text: "",
            category_text: "",
          });
          await fetchCommitment();
          fetchCommitment();
          return;
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const { data: commitmentData, loading } = useSelector(
    (store) => store.commitment
  );
  const [query, setQuery] = useState("");
  console.log("dsfdsfds", commitmentData);
  const filteredData = commitmentData?.filter((data) =>
    data.suggestion_text.toLowerCase().startsWith(query.toLowerCase())
  );

  const fields = ["suggestion_text", "user_id", "category_text"];

  return (
    <div className="dashboard container mb-5 ">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-light d-sm-inline h5">
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
                  name="suggestion_text"
                  id="form3Example3"
                  value={commitment.suggestion_text}
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
              {!categoryLoading && (
                <div className=" form-outline mb-3 ">
                  <label className="form-label h5" htmlFor="form3Example3">
                    Category
                  </label>
                  <select
                    value={commitment.category_text}
                    className="form-control form-control-lg border-1 border-dark"
                    onChange={(e) =>
                      setCommitment({
                        ...commitment,
                        category_text: e.target.value,
                      })
                    }
                  >
                    <option selected hidden value="">
                      Select a value
                    </option>
                    {categoryData.map((d) => (
                      <option>{d.category_title}</option>
                    ))}
                  </select>
                </div>
              )}
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
      <div className="row mt-4 mb-3 d-flex">
        <div className="col-sm-12 align-items-center d-flex ">
          <input
            type="text"
            name="searchText"
            className="form-control shadow-lg p-2 px-3"
            placeholder="Search here.."
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            style={{
              borderRadius: "20px",
              backgroundColor: "#5D5D5D",
              color: "#FFF",
            }}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
      </div>
      <div>
        <div style={{ borderRadius: "20px" }}>
          {!loading && commitmentData ? (
            <DataTable
              actualData={filteredData}
              delete_func={commitmentDelete}
              fields={fields}
              action={loadCommitment}
              edit_func={(e, elem) => {
                setShow(true);
                setData({
                  commitment_statement: elem.suggestion_text,
                  commitment_text: elem.category_text,
                  id: elem._id,
                });
              }}
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
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <div className=" form-outline mb-3 ">
            <label className="form-label h5" htmlFor="form3Example3">
              Commitment
            </label>
            <input
              type="text"
              name="commitment_statement"
              id="form3Example3"
              value={data?.commitment_statement}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.name]: e.target.value,
                })
              }
              className="form-control form-control-lg border-1 border-dark"
              maxLength="256"
              style={{ fontSize: "15px", borderRadius: "15px" }}
            />
          </div>
          {!categoryLoading && (
            <div className=" form-outline mb-3 ">
              <label className="form-label h5" htmlFor="form3Example3">
                Category
              </label>
              <select
                className="form-control form-control-lg border-1 border-dark"
                onChange={(e) =>
                  setData({ ...data, commitment_text: e.target.value })
                }
                value={data?.category_title}
              >
                {categoryData.map((d) => (
                  <option
                    value={d.category_title}
                    selected={data?.category_title === d.category_title}
                  >
                    {d?.category_title}
                  </option>
                ))}
              </select>
            </div>
          )}
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
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Commitment;
