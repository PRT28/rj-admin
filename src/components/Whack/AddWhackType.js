import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { WACK_API } from "../../util/api";

const AddWhackType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propData = location.state;
console.log(propData)
  const [cookies] = useCookies(["token"]);

  const [wackFile, setWackFile] = useState();
  const [wackData, setWackData] = useState({
    upload_type: 0,
    // 0: url, 1: upload
    url: "",
    // passed through previous routes
    ...propData,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setWackFile(file);
  };

  // Handle Form Change in Add Wack
  const handleChange = (e) => {
    setWackData({
      ...wackData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Complete Wack Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Payload to send
    let formPayload;
    if (wackData.upload_type == 0) {
      formPayload = {
        // Common Data
        name: wackData.name,
        description: wackData.description,
        category_id: wackData.category_id,
        asset_type: wackData.asset_type,
        keyword_name: wackData.keyword_name,
        asset_category: wackData.asset_category,
        is_announcemnet: wackData.is_announcemnet,
        sub_category_id: wackData.sub_category_id,
        sub_sub_category_id: wackData.sub_sub_category_id,
        // Specific Data
        upload_type: 0,
        url: wackData.url,
      };
    } else {
      formPayload = {
        // Common Data
        name: wackData.name,
        description: wackData.description,
        category_name: wackData.category_name,
        asset_type: wackData.asset_type,
        keyword_name: wackData.keyword_name,
        asset_category: wackData.asset_category,
        is_announcemnet: wackData.is_announcemnet,
        sub_category_id: wackData.sub_category_id,
        sub_sub_category_id: wackData.sub_sub_category_id,
        // Specific Data
        upload_type: 1,
        url: wackFile,
      };
    }
    // Send request to the API
    try {
      console.log("dsadas", formPayload);
      const response = await axios({
        method: "post",
        url: WACK_API.createWack,
        headers: {
          Authorization: cookies.token,
        },
        data: formPayload,
      });

      console.log("From AddWackType Response:", response);

      if (response.status === 201) {
        // Set the values to default and navigate to the Manage Puzzle
        setWackData({
          upload_type: 0,
          url: "",
        });
        setWackFile();
        return navigate("/whack/manage");
      }
    } catch (e) {
      console.log(e, e.response);
    }
  };

  return (
    <div className="dashboard container mb-5 vh-100">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">
          Add Wack
        </span>
      </div>
      <div className="flex-row ">
        <div
          className="flex-row col-sm card  border shadow-lg "
          style={{ borderRadius: "20px" }}
        >
          <div className=" col-md-6  align-items-center d-flex justify-content-center ">
            {/* Wack Upload Form */}
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
                    // value={wackData.upload_type}
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
                {wackData.upload_type === 0 ? (
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
                      value={wackData.url}
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
                        name="wackFile"
                        id="upload"
                        value={wackFile}
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
                    backgroundColor: "#3C8C7E",
                  }}
                >
                  <p className="h4 text-light" onClick={(e) => handleSubmit(e)}>
                    Submit
                  </p>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex align-items-center d-flex justify-content-center">
            <img
              src="https://i.pinimg.com/564x/a9/46/ed/a946ed81519c8be61034d791739ea648.jpg"
              className="img-fluid  d-none d-sm-block h-100 align-items-center d-flex justify-content-center"
              alt="Sample"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWhackType;
