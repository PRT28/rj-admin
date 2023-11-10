import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { JOY_API } from "../../util/api";

const AddJoyType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propData = location.state;

  const [cookies] = useCookies(["token"]);

  const [joyFile, setJoyFile] = useState();
  const [joyData, setJoyData] = useState({
    upload_type: 0,
    // 0: url, 1: upload
    url: "",
    // passed through previous routes
    ...propData,
  });

  // Handle the File Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setJoyFile(file);
  };

  // Handle Form Change in Add Joy
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setJoyData({
      ...joyData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Complete Joy Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Payload to send
    let formPayload;
    if (joyData.upload_type == 0) {
      formPayload = {
        // Common Data
        name: joyData.name,
        description: joyData.description,
        category_name: joyData.category_name,
        asset_type: joyData.asset_type,
        keyword_name: joyData.keyword_name,
        asset_category: joyData.asset_category,
        // Specific Data
        upload_type: 0,
        url: joyData.url,
      };
    } else {
      formPayload = {
        // Common Data
        name: joyData.name,
        description: joyData.description,
        category_name: joyData.category_name,
        asset_type: joyData.asset_type,
        keyword_name: joyData.keyword_name,
        asset_category: joyData.asset_category,
        // Specific Data
        upload_type: 1,
        url: joyFile,
      };
    }

    // Send request to the API
    try {
      const response = await axios({
        method: "post",
        url: JOY_API.createJoy,
        headers: {
          Authorization: cookies.token,
        },
        data: formPayload,
      });

      console.log("From AddJoyType Response:", response);
      if (response.status == 201) {
        // Set the values to default and navigate to the Manage Puzzle
        setJoyData({
          upload_type: 0,
          url: "",
        });
        setJoyFile();
        return navigate("/joy/manage");
      }
    } catch (e) {
      console.log(e, e.response);
    }
  };

  return (
    <div className="dashboard container mb-5 vh-100">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">Add Joy</span>
      </div>
      <div className="flex-row ">
        <div
          className="flex-row col-sm card  border shadow-lg "
          style={{ borderRadius: "20px" }}
        >
          <div className=" col-md-6  align-items-center d-flex justify-content-center overflow-hidden  ">
            {/* Joy Upload Form */}
            <form className="p-5" onSubmit={(e) => handleSubmit(e)}>
              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="form3Example3">
                  {propData.asset_type == 0
                    ? "Image"
                    : propData.asset_type == 1
                    ? "Video"
                    : "GIF"}
                </label>
                <div className="w-100">
                  <select
                    className="w-100 p-2 border-dark"
                    style={{ borderRadius: "15px", color: "black" }}
                    name="upload_type"
                    // value={joyData.upload_type}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value={0} key={"url"}>
                      Url
                    </option>
                    <option value={1} key={"upload"}>
                      Uplaod
                    </option>
                  </select>
                </div>
              </div>
              <div className=" form-outline mb-3 ">
                {joyData.upload_type === 0 ? (
                  <>
                    {/* <URL_Link /> */}
                    {/* When URL is to be rendered */}
                    <label className="form-label h5" htmlFor="url">
                      Url
                    </label>
                    <input
                      type="text"
                      name="url"
                      id="url"
                      className="form-control form-control-lg border-1 border-dark"
                      maxLength="256"
                      placeholder="http://example.com"
                      style={{ fontSize: "15px", borderRadius: "15px" }}
                      value={joyData.url}
                      onChange={(e) => handleChange(e)}
                    />
                  </>
                ) : (
                  <>
                    {/* <Upload /> */}
                    {/* When Upload is to be rendered */}
                    <label className="form-label h5" htmlFor="upload">
                      Upload
                    </label>
                    <div className="mb-3">
                      <input
                        className="form-control  border-1 border-dark"
                        type="file"
                        name="joyFile"
                        id="upload"
                        value={joyFile}
                        onChange={(e) => handleFileChange(e)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="text-center text-lg-start mt-4 pt-2 w-100">
                <button
                  type="button"
                  className="btn  btn-lg w-100"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    borderRadius: "20px",
                    backgroundColor: "#023246",
                  }}
                >
                  <p className="h4 text-light" onClick={(e) => handleSubmit(e)}>
                    Submit
                  </p>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex align-items-center d-flex justify-content-center ">
            <img
              src="https://i.pinimg.com/564x/f2/09/13/f20913b52be1340616c79badc63caaf0.jpg"
              className="img-fluid  d-none d-sm-block h-75 align-items-center d-flex justify-content-center"
              alt="Sample image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJoyType;
