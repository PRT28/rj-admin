import React from "react";

const TotalData = ({ data }) => {
  return (
    <>
      <div className="row">
        <div
          className="col-sm card mx-2 border shadow-lg  p-4 mb-3 pb-2"
          style={{ borderRadius: "20px", backgroundColor: '#FFEEE0' }}
        >
          <i
            className="fa-solid fa-user p-3 rounded mb-3 fa-2x "
            style={{
              backgroundColor: "#16B8D9",
              width: "fit-content",
              color: "white",
            }}
          ></i>
          <p className="h4">Total</p>
          <p className="h6">Joys</p>
          <p className="h4">{data[0].length}</p>
        </div>
        <div
          className="col-sm card border mx-2 border shadow-lg p-4 mb-3 pb-2"
          style={{ borderRadius: "20px", backgroundColor: '#FFEEE0' }}
        >
          <i
            className="fas fa-clipboard-list p-3 rounded mb-3 fa-2x "
            style={{
              backgroundColor: "#16B8D9",
              width: "fit-content",
              color: "white",
            }}
          ></i>
          <p className="h4">Total</p>
          <p className="h6">Category</p>
          <p className="h4">{data[1].length}</p>
        </div>
        <div
          className="col-sm card border mx-2 border-0 shadow-lg p-4 mb-3 pb-2"
          style={{ borderRadius: "20px", backgroundColor: '#FFEEE0' }}
        >
          <i
            className="fas fa-align-left p-3 rounded mb-3 fa-2x "
            style={{
              backgroundColor: "#16B8D9",
              width: "fit-content",
              color: "white",
            }}
          ></i>
          <p className="h4">Total</p>
          <p className="h6">Keywords</p>
          <p className="h4">{data[2].length}</p>
        </div>
        <div
          className="col-sm card border mx-2 shadow-lg p-4 mb-3 pb-2"
          style={{ borderRadius: "20px", backgroundColor: '#FFEEE0' }}
        >
          <i
            className="fas fa-comment p-3 rounded mb-3 fa-2x "
            style={{
              backgroundColor: "#16B8D9",
              width: "fit-content",
              color: "white",
            }}
          ></i>
          <p className="h4">Total</p>
          <p className="h6">Puzzle</p>
          <p className="h4">{data[3].length}</p>
        </div>
        {/* <div
          className="col-sm card mx-2 border shadow-lg p-4 mb-3 pb-2"
          style={{ borderRadius: "20px" }}
        >
          <i
            className="fa-solid fa-user p-3 rounded mb-3 fa-2x "
            style={{
              backgroundColor: "#3C8C7E",
              width: "fit-content",
              color: "white",
            }}
          ></i>
          <p className="h4">Total</p>
          <p className="h6">Commitments</p>
          <p className="h4">{data[4].length}</p>
        </div> */}
        <div
          className="col-sm card mx-2 border shadow-lg p-4 mb-3 pb-2"
          style={{ borderRadius: "20px", backgroundColor: '#FFEEE0' }}
        >
          <i
            className="fab fa-solid fa-wikipedia-w p-3 rounded mb-3 fa-2x "
            style={{
              backgroundColor: "#16B8D9",
              width: "fit-content",
              color: "white",
            }}
          ></i>
          <p className="h4">Total</p>
          <p className="h6">Whacks</p>
          <p className="h4">{data[5].length}</p>
        </div>
      </div>
    </>
  );
};

export default TotalData;
