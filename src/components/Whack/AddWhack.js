import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StringValidate from "../../util/inputStringValidate";
import { CATEGORY_API, KEYWORD_API } from "../../util/api";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Dropdown } from "react-bootstrap";

const AddWhack = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  // const dispatch=useDispatch();

  // State for the Checked Input
  const [checkedState, setCheckedState] = useState();
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState([]);

  // State for the WhackData Input
  const [wackData, setWackData] = useState({
    name: "",
    description: "",
    category_name: "",
    asset_type: 0,
    // 0- image , 1-video, 2- gif
    keyword_name: [],
    asset_category: 2,
    // 0- Asset, 1- Joy, 2- Whack
  });

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
  categoryFetch();

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
  keywordFetch();

  // Handle the Form Data Change
  const handleChange = (e) => {
    let value = StringValidate(e.target.value);
    setWackData({
      ...wackData,
      [e.target.name]: e.target.name !== "description" ? value : e.target.value,
    });
  };

  // Handle the Form Data on Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // regex to check for any unusual pattern or palyoad
    const stringPattern = /^(?!.*__)[a-zA-Z0-9_]+$/;

    navigate("/joy/add/type", {
      state: { ...wackData, keyword_name: selectedKeywords },
    });
    return setWackData({
      ...wackData,
      name: "",
      description: "",
      category_name: "",
      asset_type: 0,
      // 0- image , 1-video, 2- gif
      asset_category: 2,
      // 1-Joy 2-Wack
    });
  };
  const whackType = ["video", "audio", "gif"];

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
          <div className=" col-md-6  align-items-center d-flex justify-content-center overflow-hidden ">
            {/* Add Wack Form */}
            <form
              className="p-5"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="wackName">
                  Wack Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={wackData.name}
                  onChange={(e) => handleChange(e)}
                  id="wackName"
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
                    name="category_name"
                    value={wackData.category_name}
                    onChange={(e) => handleChange(e)}
                  >
                    <option> Select an option </option>
                    {/* Map all the category recieved from the Category API */}
                    {category.length !== 0 && (
                      <>
                        {category.map((el) => (
                          <option
                            value={el.category_title}
                            key={el.category_title}
                          >
                            {el.category_title}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
              {/* Description */}
              <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={wackData.description}
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
              src="https://i.pinimg.com/564x/a9/46/ed/a946ed81519c8be61034d791739ea648.jpg"
              className="img-fluid  d-none d-sm-block h-100 align-items-center d-flex justify-content-center"
              alt="Sample whack"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWhack;
