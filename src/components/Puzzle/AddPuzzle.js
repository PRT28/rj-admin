import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PUZZLE_API } from "../../util/api";
import { useCookies } from "react-cookie";
import QuestionType from "./QuestionType";

const AddPuzzle = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // Question Type available
  const questiontypes = ["MCQ", "T/F", "Text"];

  const [puzzleData, setPuzzleData] = useState({
    question: "",
    questionType: 0,
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  });

  const [checkedState, setCheckedState] = useState({
    selectedOption: "",
  });

  // Handle the checkbox input
  const handleCheckboxChange = (event) => {
    setCheckedState({ selectedOption: event.target.value });
  };

  // Handle Form Change in Add Puzzle
  const handleChange = (e) => {
    // let value = StringValidate(e.target.value);
    const value = e.target.value;
    setPuzzleData({
      ...puzzleData,
      [e.target.name]:
        value == "MCQ" ? 0 : value == "T/F" ? 1 : value == "Text" ? 2 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("onSubmit", puzzleData);

    // Send request to the API
    console.log(puzzleData);

   try {
      const response = await axios({
        method: "post",
        url: PUZZLE_API.createPuzzle,
        headers: {
          Authorization: cookies["token"],
        },
        data: puzzleData,
      });


      // Set the values to default and navigate to the Manage Puzzle
      setPuzzleData({
        ...puzzleData,
        question: "",
        questionType: 0,
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
      });

      if (response.status === 201) navigate("/puzzle/manage");
    } catch (e) {
      console.log(e, e.response);
    }
  };

  // Sub Components
  // const OptionQuestion = () => {
  //   return (
  //   );
  // };

  // const BooleanQuestion = () => {
  //   return (
  //   );
  // };

  // const TextQuestion = () => {
  //   return (
  //   );
  // };

  return (
    <>
      <div className="dashboard container">
        <div className="nav-items fs-4 pb-3">
          <span className="d-none text-sm text-dark d-sm-inline h5">
            Add Puzzle
          </span>
        </div>
        <div className="row ">
          <div
            className="col-sm card p-4  mb-5 shadow-lg"
            style={{ borderRadius: "20px", backgroundColor: "#494949", border: '1px solid white' }}
          >
            <div className="row pb-5">
              <p className="h5 text-light"> ADD PUZZLE FORM</p>
            </div>
            <div className="row ">
              <div className="col-sm-12">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mx-3">
                    <div className="form-group row mt-4 mb-4 d-flex flex-row w-100 px-md-5">
                      <label
                        htmlFor="question"
                        className="col-sm-6 col-md-12 col-form-label h5 text-light"
                      >
                        Question
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 border-dark"
                        style={{ borderRadius: "20px" }}
                        id="question"
                        onChange={(e) => handleChange(e)}
                        name="question"
                        value={puzzleData.question}
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-around align-items-center ">
                      <div className="form-group row mt-4 mb-4 d-flex flex-row w-50 px-md-5">
                        <label
                          htmlFor="questionType"
                          className="col-sm-6 col-form-label h5 text-light"
                        >
                          Question Type
                        </label>
                        <select
                          className="d-flex border-dark p-2"
                          style={{ borderRadius: "20px" }}
                          name="questionType"
                          onChange={(e) => handleChange(e)}
                          id="questionType"
                        >
                          <option selected hidden value="">Select</option>
                          {questiontypes.map((elem) => {
                            return (
                              <option value={elem}>
                                {elem}
                              </option>
                            );
                          })}
                        </select>

                        <div className="col-sm-6 bg-dark"></div>
                      </div>
                    </div>
                  </div>
                  <div className=" d-flex  justify-content-around text-light">
                    {/* Show Component according to the questionType */}
                    <QuestionType
                      puzzleData={puzzleData}
                      handleChange={handleChange}
                      handleCheckboxChange={handleCheckboxChange}
                      checkedState={checkedState}
                    />
                  </div>
                  <div className="form-group row mt-4 mb-4 justify-content-center">
                    <div className="col-sm-12 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-lg px-5 "
                        style={{ backgroundColor: "#494949",border:"1px white solid" }}
                        onClick={(e) => handleSubmit(e)}
                      >
                        <p className="h5 text-light">Submit</p>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPuzzle;
