import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { KEYWORD_API } from "../../util/api";
import { loadKeyword } from "../../slices/keywordSlice";
import DataTable from "../DataTable";

const Keyword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const keywordDelete = async (e, elem) => {
    try {
      const response = await axios({
        method: "delete",
        url: KEYWORD_API.deleteKeyword + `?id=${elem._id}`,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status == 200) {
        dispatch(loadKeyword(response.data));
        return navigate("/keyword");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: KEYWORD_API.getAllKeyword,
        headers: {
          Authorization: cookies.token,
        },
      });
      // Dispatch the data to the puzzleSlice to be stored in the store
      dispatch(loadKeyword(response.data));
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  // get the data from the state.
  const { loading, data: keywordData } = useSelector((state) => state.keyword);

  const fields = ["keyword_title", "keyword_description"];

  return (
    <>
      <div className="dashboard container vh-100">
        <div className="row">
          <div>
            <div className="row mt-4  d-flex ">
              <div className="col-sm-6 align-items-center d-flex ">
                <div className="nav-items fs-4 pb-3">
                  <span className="d-none text-sm text-light d-sm-inline h5">
                    Keyword
                  </span>
                </div>
              </div>
              <div className="col-sm-6 d-flex flex-row-reverse px-5">
                <Link
                  to="/addkeyword"
                  className="text-decoration-none"
                  aria-current="page"
                  style={{ color: "#ffffff" }}
                >
                  <button
                    type="button"
                    className="btn btn-dark btn-lg border-2 px-5"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#494949",
                      borderColor: "white",
                    }}
                  >
                    <p className="h5">
                      <i
                        className="fas fa-plus mx-2 "
                        style={{ color: "#ffffff" }}
                      ></i>
                      Add
                    </p>
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <div style={{ borderRadius: "20px" }}>
                {!loading && keywordData ? (
                  <DataTable
                    actualData={keywordData}
                    fields={fields}
                    editableFields={["keyword_description", "keyword_title"]}
                    delete_func={keywordDelete}
                    edit_API={KEYWORD_API.updateKeyword}
                    action={loadKeyword}
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
        </div>
      </div>
    </>
  );
};

export default Keyword;
