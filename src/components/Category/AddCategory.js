import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CATEGORY_API } from "../../util/api";
import { useCookies } from "react-cookie";

const AddCategory = ({setShow, fetchApi}) => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // Category Data State
  const [categoryData, setCategoryData] = useState({
    category_title: "",
    category_description: "",
  });
  // Handle Form Change in Add Category
  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  // Handle Complete Category Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to the API
    try {
      const response = await axios({
        method: "post",
        url: CATEGORY_API.createCategory,
        headers: {
          Authorization: cookies["token"],
        },
        data: categoryData,
      });

      // Set the values to default and navigate to the Manage Puzzle
      if (response.status === 201) {
        alert("Category added successfully");
        setCategoryData({
          ...categoryData,
          category_title: "",
          category_description: "",
        });
        fetchApi();
        setShow(false);
      };
    } catch (e) {
      console.log(e, e.response);
    }
  };

  return (
    <div className="dashboard container mb-5 vh-100">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">
          Add Category
        </span>
      </div>
      <div className="flex-row ">
        <div
          className="flex-row col-sm card  border shadow-lg p-5 h-100"
          style={{ borderRadius: "20px" }}
        >
          {/* <form onSubmit={handleSubmit}> */}
          <div className="col-md-6  align-items-center d-flex justify-content-center overflow-hidden">
            <form className="p-5" onSubmit={(e) => handleSubmit(e)}>
              <div className="">
                <div className=" form-outline mb-3 ">
                  <label className="form-label h5" htmlFor="categoryTitle">
                    Category Title
                  </label>
                  <input
                    type="text"
                    name="category_title"
                    id="categoryTitle"
                    className="form-control form-control-lg border-1 border-dark"
                    maxLength="256"
                    style={{ fontSize: "15px", borderRadius: "15px" }}
                    value={categoryData.category_title}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-outline mb-3 ">
                  <label
                    className="form-label h5"
                    htmlFor="categoryDescription"
                  >
                    Category Description
                  </label>
                  <input
                    type="text"
                    name="category_description"
                    id="categoryDescription"
                    className="form-control form-control-lg border-1 border-dark"
                    minLength="8"
                    style={{ fontSize: "15px", borderRadius: "15px" }}
                    value={categoryData.category_description}
                    onChange={(e) => handleChange(e)}
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
              </div>
            </form>
          </div>
          <div
            className=" col-md-6  align-items-center d-flex justify-content-center "
            style={{
              borderRadius: "20px",
              height: "50vh",
            }}
          >
            <img
              src="https://i.pinimg.com/564x/6d/6b/c9/6d6bc96fe77fe56477df38bc3993c6dc.jpg"
              className="w-75 d-none d-sm-block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
