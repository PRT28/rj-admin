import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import { editPuzzle, loadPuzzle } from "../../slices/puzzleSlice";
import { PUZZLE_API } from "../../util/api";
import DataTable from "../DataTable";
import AddPuzzle from "./AddPuzzle";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function ManagePuzzle() {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  
  const [data, setData] = useState(null)
  const [show, setShow] = useState(false);

  const fetchApi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: PUZZLE_API.getAllPuzzle,
        headers: {
          Authorization: cookies.token,
        },
      });
      if (response.status === 200) return dispatch(loadPuzzle(response.data));
    } catch (e) {
      console.warn(e);
    }
  };

  const puzzleDelete = async (e, elem) => {
    try {
      const response = await axios({
        method: "delete",
        url: PUZZLE_API.deletePuzzle + `?id=${elem._id}`,
        headers: {
          Authorization:cookies.token
        },
      });
      if (response.status === 200) fetchApi(); ;
    } catch (err) {
      console.log(err, err.response);
    }
  };
  
  const puzzleUpdate=async(e,index,editData,elem)=> {
    // e.preventDefault()
    try {
      const response=await axios({
        method:"put",
        url: PUZZLE_API.updatePuzzle,
        params: {puzzleId:elem._id},
        headers: {
          Authorization:cookies.token
        },
        data: {...editData}
      })
      if (response.status=201) {
        dispatch(editPuzzle({updatedData:response.data,index:index}))
      }
    }
    catch (e){
      console.warn(e)
    }
  }

  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  // get the data from the state.
  const { loading, data: puzzleData } = useSelector((state) => state.puzzle);
  console.log("puzzleData is",puzzleData)
  // Change questionType from number value to Text
  const puzzleTableData = [];
  !loading && puzzleData.forEach((puzzle) => {
    let type = "";
    for (let prop in puzzle) {
      if (prop === "questionType") {
        type =
          puzzle["questionType"] === 0
            ? "Options"
            : puzzle["questionType"] === 1
            ? "True/False"
            : "Text Answer";
      }
    }
    puzzleTableData.push({ ...puzzle, questionType: type });
  });

  const showData = [];
  puzzleData.map((obj) =>
    showData.push({
      ...obj,
      questionType:
        obj.questionType === 0
          ? "Options"
          : obj.questionType === 1
          ? "True/False"
          : "Text",
    })
  );

  const fields = [
    "question",
    "questionType",
    "optionA",
    "optionB",
    "optionC",
    "optionD",
    "answer",
  ];
  return (
    <div className="dashboard container vh-100">
      <div className="nav-items fs-4 ">
        <span className="d-none text-sm text-light d-sm-inline h6">
          {`Puzzle-> Manage Puzzle`}
        </span>
      </div>
      <div className="row">
        <div>
          <div className="  " style={{ borderRadius: "20px" }}>
            {!loading && puzzleData ? (
              <DataTable
                actualData={puzzleData}
                showData={showData}
                fields={fields}
                delete_func={puzzleDelete}
                edit_func={(e, elem) => { setShow(true); setData(elem); }}
                editableFields={{ component: "puzzle", editArray: ["answer"] }}
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
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <AddPuzzle setShow={setShow} fetchApi={fetchApi} data={data} />
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ManagePuzzle;
