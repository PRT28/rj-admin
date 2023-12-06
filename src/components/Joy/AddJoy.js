import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StringValidate from "../../util/inputStringValidate";
import {
  CATEGORY_API,
  KEYWORD_API,
  SUB_CATEGORY_API,
  SUB_SUB_CATEGORY_API,
} from "../../util/api";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Dropdown } from "react-bootstrap";
import SubSubCategory from "../SubSubCategory/SubSubcategory";

const AddJoy = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [keyword, setKeyword] = useState([]);

  const [file, setFile] = useState(null);

  // State for the Checked Input
  const [checkedState, setCheckedState] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // State for the JoyData Input
  const [joyData, setJoyData] = useState({
    name: "",
    description: "",
    category_id: "",
    asset_type: 0,
    // 0- image , 1-video, 2- gif
    keyword_name: [],
    asset_category: 1,
    is_announcemnet: false,
    sub_category_id: "",
    sub_sub_category_id: "",
    // 0- Asset, 1- Joy, 2- Whack
  });

  const handleSetAnnouncement = () => {
    setJoyData({ ...joyData, is_announcemnet: !joyData.is_announcemnet });
  };

  const categoryFetch = async () => {
    const response = await axios({
      method: "get",
      url: CATEGORY_API.getAllCategory,
      headers: {
        Authorization: cookies.token,
      },
    });
    setCategory(response.data);
  };
  const subCategoryFetch = async () => {
    const response = await axios({
      method: "get",
      url: SUB_CATEGORY_API.getAllCategory,
      headers: {
        Authorization: cookies.token,
      },
    });
    setSubCategory(response.data);
  };

  const subSubCategoryFetch = async () => {
    const response = await axios({
      method: "get",
      url: SUB_SUB_CATEGORY_API.getAllCategory,
      headers: {
        Authorization: cookies.token,
      },
    });

    setSubSubCategory(response.data);
  };

  const keywordFetch = async () => {
    const response = await axios({
      method: "get",
      url: KEYWORD_API.getAllKeyword,
      headers: {
        Authorization: cookies.token,
      },
    });

    setKeyword(response.data);
  };
  useEffect(() => {
    keywordFetch();
    subCategoryFetch();
    categoryFetch();
    subSubCategoryFetch();
  }, []);

  // Handle the Form Data Change
  const handleChange = (e) => {
    console.log(joyData,e.target.name);
    let value = StringValidate(e.target.value);

    setJoyData((joyData) => {
      return {
        ...joyData,
        [e.target.name]:
          e.target.name !== "description" ? value : e.target.value,
      };
    });
  };

  // Handle the checkbox input
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setCheckedState(value);
  };

  const handleSelectChange = (eventKey) => {
    if (selectedKeywords.includes(eventKey)) {
      // If the option is already selected, remove it
      setSelectedKeywords(
        selectedKeywords.filter((keyword) => keyword !== eventKey)
      );
    } else {
      // If the option is not selected, add it
      setSelectedKeywords([...selectedKeywords, eventKey]);
    }
  };

  // Handle the Form Data on Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // regex to check for any unusual pattern or palyoad
    const stringPattern = /^(?!.*__)[a-zA-Z0-9_]+$/;

    navigate("/joy/add/type", {
      state: { ...joyData, keyword_name: selectedKeywords },
    });
    return setJoyData({
      ...joyData,
      name: "",
      description: "",
      category_id: "",
      asset_type: 0,
      // 0- image , 1-video, 2- gif
      asset_category: 1,
      is_announcemnet: false,
      sub_category_id: "dsad",
      sub_sub_category_id: "dsdas",
      // 1-Joy 2-Wack
    });
  };
  console.log(subSubCategory);
  const joyType = ["video", "audio", "gif"];

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
          <div className=" col-md-6  align-items-center d-flex justify-content-center overflow-hidden ">
            {/* Add Joy Form */}
            <form
              className="p-5"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="joyName">
                  Joy Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={joyData.name}
                  onChange={(e) => handleChange(e)}
                  id="joyName"
                  className="form-control form-control-lg border-1 border-dark"
                  maxLength="256"
                  style={{ fontSize: "15px", borderRadius: "15px" }}
                  required={true}
                />
              </div>
              <div className="form-outline mb-3 ">
                <label className="form-label h5" htmlFor="category">
                  Category
                </label>
                <div className="w-100">
                  <select
                    id="category"
                    className="w-100 p-2 border-dark"
                    style={{ borderRadius: "15px", color: "black" }}
                    name="category_id"
                    value={joyData.category_id}
                    onChange={(e) => handleChange(e)}
                  >
                    <option> Select an option </option>
                    {/* Map all the category recieved from the Category API */}
                    {category.length !== 0 && (
                      <>
                        {category.map((el) => (
                          <option value={el._id} key={el.category_id}>
                            {el.category_title}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="form-outline mb-3 ">
                <label className="form-label h5" htmlFor="subCategory">
                  SubCategory
                </label>
                <div className="w-100">
                  <select
                    id="subcategory"
                    className="w-100 p-2 border-dark"
                    style={{ borderRadius: "15px", color: "black" }}
                    name="sub_category_id"
                    value={joyData.sub_category_id}
                    onChange={(e) => handleChange(e)}
                  >
                    <option> Select an option </option>
                    {/* Map all the category recieved from the Category API */}
                    {subCategory.length !== 0 && (
                      <>
                        {subCategory.map((el) => (
                          <option value={el._id} key={el._id}>
                            {el.title}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="form-outline mb-3 ">
                <label className="form-label h5" htmlFor="category">
                  Sub_Sub_Category
                </label>
                <div className="w-100">
                  <select
                    id="subcategory"
                    className="w-100 p-2 border-dark"
                    style={{ borderRadius: "15px", color: "black" }}
                    name="sub_sub_category_id"
                    value={joyData.sub_sub_category_id}
                    onChange={(e) => handleChange(e)}
                  >
                    <option> Select an option </option>
                    {/* Map all the category recieved from the Category API */}
                    {subSubCategory.length !== 0 && (
                      <>
                        {subSubCategory.map((el) => (
                          <option value={el._id} key={el._id}>
                            {el.title}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
              {/* Desciption */}
              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={joyData.description}
                  onChange={(e) => handleChange(e)}
                  className="form-control form-control-lg border-1 border-dark"
                  maxLength="256"
                  style={{ fontSize: "15px", borderRadius: "15px" }}
                  required={true}
                />
              </div>

              {/* Keyword */}
              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="keyword">
                  Keyword
                </label>
                <Dropdown onSelect={(eventKey) => handleSelectChange(eventKey)}>
                  {/* Keyword Dropdown Titile */}
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    // name={joyData.keyword_name}
                    className="w-100 p-2 border-dark bg-transparent"
                    style={{ borderRadius: "15px", color: "black" }}
                  >
                    Select
                  </Dropdown.Toggle>
                  {/* Keyword listing */}
                  <Dropdown.Menu>
                    {/* Map all the keyword recieved from the Keyword API */}
                    {keyword.length !== 0 && (
                      <>
                        {keyword.map((el) => (
                          // Keyword Items
                          <Dropdown.Item
                            key={el.keyword_title}
                            eventKey={el.keyword_title}
                          >
                            {el.keyword_title}
                          </Dropdown.Item>
                        ))}
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

                {/* Show selected Keywords */}
                <div className="mt-3">
                  <h5>Selected Keyword :</h5>
                  <ul>
                    {selectedKeywords.length === 0
                      ? "No Keyword Selected"
                      : selectedKeywords.map((el) => <li key={el}>{el}</li>)}
                  </ul>
                </div>
              </div>

              {/* Checkbox Input */}
              <div
                className="my-4"
                style={{ display: "flex", alignItems: "center", gap: 5 }}
                onClick={handleSetAnnouncement}
              >
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid black",
                    width: "fit-content",
                    background: joyData.is_announcemnet ? "blue" : "white",
                    borderRadius: "40px",
                  }}
                ></div>

                <div className="h5 mt-2">Announcement</div>
              </div>

              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="asset_type">
                  Choose File Type
                </label>
                <div className="d-flex mx-2">
                  <div className="form-check mx-2">
                    <input
                      className="form-check-input border-dark"
                      name="asset_type"
                      type="checkbox"
                      value={0}
                      id="imageType"
                      checked={checkedState == 0}
                      onChange={handleCheckboxChange}
                      onClick={(e) => handleChange(e)}
                    />
                    <label className="form-check-label" htmlFor="imageType">
                      Image
                    </label>
                  </div>
                  <div className="form-check mx-2 ">
                    <input
                      className="form-check-input border-dark"
                      // defaultChecked={true}
                      name="asset_type"
                      type="checkbox"
                      value={1}
                      id="videoType"
                      checked={checkedState == 1}
                      onChange={handleCheckboxChange}
                      onClick={(e) => handleChange(e)}
                    />
                    <label className="form-check-label" htmlFor="videoType">
                      Video
                    </label>
                  </div>

                  <div className="form-check mx-2">
                    <input
                      className="form-check-input border-dark"
                      name="asset_type"
                      type="checkbox"
                      value={2}
                      id="gifType"
                      checked={checkedState == 2}
                      onChange={handleCheckboxChange}
                      onClick={(e) => handleChange(e)}
                    />
                    <label className="form-check-label" htmlFor="gifType">
                      GIF
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2 w-100">
                <button
                  type="submit"
                  className="btn btn-lg w-100"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    borderRadius: "20px",
                    backgroundColor: "#3C8C7E",
                  }}
                >
                  <p className="h4 text-light">Next</p>
                </button>
              </div>
            </form>

            {/* Side Image  */}
          </div>
          <div className="col-md-6 d-flex align-items-center d-flex justify-content-center">
            <img
              src="https://i.pinimg.com/564x/f2/09/13/f20913b52be1340616c79badc63caaf0.jpg"
              className="img-fluid  d-none d-sm-block h-100 align-items-center d-flex justify-content-center"
              alt="Sample joy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJoy;
