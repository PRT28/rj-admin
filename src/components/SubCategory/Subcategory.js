import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import { loadSubCategory } from "../../slices/subcategorySlice";
import { CATEGORY_API, SUB_CATEGORY_API } from "../../util/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DataTable from "../DataTable";
import AddSubCategory from "./AddSubCategory";

const SubCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const [cookies] = useCookies(["token"]);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const subCategoryDelete = async (e, elem) => {
    try {
      const response = await axios({
        method: "delete",
        url: SUB_CATEGORY_API.deleteCategory + `${elem._id}`,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status == 200) {
        dispatch(loadSubCategory(response.data));
        return navigate("/subcategory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: SUB_CATEGORY_API.getAllCategory,
        headers: {
          Authorization:
            // cookies.token,
            cookies.token,
        },
      });
      // Dispatch the data to the puzzleSlice to be stored in the store
     console.log(response.data)
      return dispatch(loadSubCategory(response.data));
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  const [query, setQuery] = useState("");

  // get the data from the state.
  const { loading, data: categoryData } = useSelector(
    (state) => state.subcategory
  );

  const filteredData = categoryData?.filter((data) =>
    data.title.toLowerCase().startsWith(query.toLowerCase())
  );
  console.log(filteredData)

  const fields = ["title", "description"];
  return (
    <div className="dashboard container vh-100">
      <div className="row h-100">
        <div>
          <div className="row mt-4  d-flex">
            <div className="col-sm-6 align-items-center d-flex ">
              <span className="d-none text-sm text-light d-sm-inline h5">
                Category
              </span>
            </div>
            <div className="col-sm-6 d-flex flex-row-reverse px-5">
              <button
                type="button"
                className="btn btn-light btn-lg border-2 px-5"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#494949",
                  borderColor: "white",
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
              </button>
            </div>
          </div>
          <div>
            <div className="row mt-4 mb-3 d-flex">
              <div className="col-sm-12 align-items-center d-flex ">
                <input
                  type="text"
                  name="searchText"
                  className="form-control shadow-lg p-2 px-3"
                  placeholder="Search title here.."
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
            <div className=" h-75 " style={{ borderRadius: "20px" }}>
              {!loading && categoryData ? (
                <DataTable
                  actualData={filteredData}
                  fields={fields}
                  delete_func={subCategoryDelete}
                  edit_func={(e, elem) => {
                    setShow(true);
                    setData(elem);
                  }}
                  action={loadSubCategory}
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
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <AddSubCategory setShow={setShow} fetchApi={fetchApi} data={data} />
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubCategory;
