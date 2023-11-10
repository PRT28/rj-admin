import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { KEYWORD_API } from "../../util/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StringValidate from "../../util/inputStringValidate";

const AddKeyword = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // Keyword Data State
  const [keywordData, setKeywordData] = useState({
    title: "",
    description: "",
  });

  // Fetching the user Data from redux state
  // const { loading, data } = useSelector((state) => state.admin);

  // Handle Form Change in Add Category
  const handleChange = (e) => {
    let value = StringValidate(e.target.value);
    setKeywordData({ ...keywordData, [e.target.name]: value.toLowerCase() });
  };

  // Handle Complete Category Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to the API
    try {
      const response = await axios({
        method: "post",
        url: KEYWORD_API.createKeyword,
        headers: {
          Authorization: cookies["token"],
        },
        data: keywordData,
      });

      // Set the values to default and navigate to the Manage Keywords
      setKeywordData({
        ...keywordData,
        title: "",
        description: "",
      });

      if (response.status === 201) return navigate("/keyword");
    } catch (e) {
      console.log("From AddKeyword Error:", e);
    }
  };

  return (
    <div className="dashboard container mb-5 vh-100">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">
          Add Keyword
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
                <label className="form-label h5" htmlFor="title">
                  Keyword Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={keywordData.title}
                  className="form-control form-control-lg border-1 border-dark"
                  maxLength="256"
                  style={{ fontSize: "15px", borderRadius: "15px" }}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-outline mb-3 ">
                <label className="form-label h5" htmlFor="description">
                  Keyword Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={keywordData.description}
                  className="form-control form-control-lg border-1 border-dark"
                  minLength="8"
                  style={{ fontSize: "15px", borderRadius: "15px" }}
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
            </form>
          </div>
          <div
            className="col-md-6 h-100 d-flex "
            style={{ backgroundColor: "#3C8C7E" }}
          >
            <img
              src="https://i.pinimg.com/564x/05/b5/59/05b55998b0d6b021e38a1c3e77f27d6a.jpg"
              className="img-fluid w-100 d-none d-sm-block "
              alt="Sample image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKeyword;
