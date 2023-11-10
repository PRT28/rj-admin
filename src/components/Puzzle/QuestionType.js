import React from "react";

const QuestionType = ({
  puzzleData,
  handleChange,
  handleCheckboxChange,
  checkedState,
}) => {
  return (
    <>
      {puzzleData.questionType == 0 ? (
        // When Option selected
        // <OptionQuestion />

        <div>
          <div className="d-flex flex-row justify-content-around align-items-center ">
            <div className=" row mt-4 mb-4 d-flex flex-row w-50 px-md-5">
              <label htmlFor="optionA" className="col-sm-6 col-form-label h5">
                Option A
              </label>
              <input
                type="text"
                className="form-control w-100 border-dark"
                style={{ borderRadius: "20px" }}
                id="optionA"
                onChange={(e) => handleChange(e)}
                name="optionA"
                value={puzzleData.optionA}
              />
              <div className="col-sm-6 bg-dark"></div>
            </div>
            <div className="form-group row mt-4 mb-4 d-flex flex-row w-50 px-md-5">
              <label htmlFor="optionB" className="col-sm-6 col-form-label h5">
                Option B
              </label>
              <input
                type="text"
                className="form-control w-100 border-dark"
                style={{ borderRadius: "20px" }}
                id="optionB"
                onChange={(e) => handleChange(e)}
                name="optionB"
                value={puzzleData.optionB}
              />
              <div className="col-sm-6 bg-dark"></div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around align-items-center ">
            <div className="form-group row mt-4 mb-4 d-flex flex-row w-50 px-md-5">
              <label htmlFor="optionC" className="col-sm-6 col-form-label h5">
                Option C
              </label>
              <input
                type="text"
                className="form-control w-100 border-dark"
                style={{ borderRadius: "20px" }}
                id="optionC"
                onChange={(e) => handleChange(e)}
                name="optionC"
                value={puzzleData.optionC}
              />
              <div className="col-sm-6 bg-dark"></div>
            </div>
            <div className="form-group row mt-4 mb-4 d-flex flex-row w-50 px-md-5">
              <label htmlFor="optionD" className="col-sm-6 col-form-label h5">
                Option D
              </label>
              <input
                type="text"
                className="form-control w-100 border-dark"
                style={{ borderRadius: "20px" }}
                id="optionD"
                onChange={(e) => handleChange(e)}
                name="optionD"
                value={puzzleData.optionD}
              />
              <div className="col-sm-6 bg-dark"></div>
            </div>
          </div>
        </div>
      ) : puzzleData.questionType == 1 ? (
        // When T/F selected
        // <BooleanQuestion />
        <div>
          <div>
            <div className="col h5 mt-5">
              <label htmlFor="true" className="mx-5">
                <input
                  className="p-5 m-2 border-dark "
                  type="checkbox"
                  id="true"
                  name="answer"
                  value="true"
                  checked={checkedState.selectedOption === "true"}
                  onChange={handleCheckboxChange}
                  onClick={(e) => handleChange(e)}
                />
                True
              </label>
              <label htmlFor="false " className="mx-5">
                <input
                  className="m-2"
                  type="checkbox"
                  id="false"
                  name="answer"
                  value="false"
                  checked={checkedState.selectedOption === "false"}
                  onChange={handleCheckboxChange}
                  onClick={(e) => handleChange(e)}
                />
                False
              </label>
            </div>
          </div>
        </div>
      ) : (
        // When Text selected
        // <TextQuestion />
        <div>
          <div className="row">
            <label htmlFor="textAnswer">Text</label>
            <input
              type="text"
              className="form-control"
              id="wordToEnter"
              name="answer"
              value={puzzleData.answer}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionType;
