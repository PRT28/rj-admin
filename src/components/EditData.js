import axios from 'axios'
import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const EditData = ({editableFields,fields,index,isEdit,edit_API,action,setEdit}) => {
  const dispatch=useDispatch()
  const [cookies]=useCookies(["token"])
  let {loading,data}=useSelector((store)=> (store[editableFields.component]))
  const [editData, setEditData] = useState(editableFields.editArray.reduce((obj, key) => {
    obj[key] = data[index][key];
    return obj;
  }, {}))
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  return (
    <div className="dashboard container mb-5">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">
          Edit Data
        </span>
      </div>
      <div className="flex-row ">
        <div
          className="flex-row col-sm card  border shadow-lg p-5 h-100"
          style={{ borderRadius: "20px" }}
        >
          {/* <form onSubmit={handleSubmit}> */}
          <form
            className=" col-md-6  align-items-center d-flex justify-content-center"
            // onSubmit={(e) => handleSubmit(e)}
          >
            <div className="w-50">
              {!loading && fields.map((elem)=>{
                return(
                <div className=" form-outline mb-3 ">
                <label className="form-label h5" htmlFor="form3Example3">
                  {elem}
                </label>
                <input
                  type="text"
                  name={elem}
                  id="form3Example3"
                  className="form-control form-control-lg border-1 border-dark"
                  maxLength="256"
                  placeholder={data[index][elem]}
                  style={{ fontSize: "15px", borderRadius: "15px" }}
                  value={editData[elem]}
                  onChange={(e) => handleChange(e)}
                />
              </div>
                )
              })}
              <div className="text-center text-lg-start mt-4 pt-2 w-100">
                <button
                  type="submit"
                  className="btn  btn-lg w-100"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    borderRadius:    "20px",
                    backgroundColor: "#3C8C7E",
                  }}
                  // onClick={(e)=> onSave(e)}
                >
                  <p className="h4 text-light">Submit</p>
                </button>
              </div>
            </div>
          </form>
          <div
            className=" col-md-6  align-items-center d-flex justify-content-center  "
            style={{
              borderRadius: "20px",
              height: "50vh",
              // backgroundColor: "#3C8C7E",
            }}
          >
          <img src="https://i.pinimg.com/564x/6d/6b/c9/6d6bc96fe77fe56477df38bc3993c6dc.jpg"
          className="w-50"/>
            {/* <div className="w-50 ">
              <p className="h4 align-items-center d-flex justify-content-center mb-6">
                Category Icon
              </p>
              <div className=" form-outline align-items-center d-flex justify-content-center   ">
                <div className="mb-3 justify-content-center mt-5 mb-5">
                  <i className="fas fa-cloud-upload-alt fa-7x justify-content-center"></i>
                </div>
              </div>
              <input
                className="form-control"
                type="file"
                name="filepath"
                style={{ backgroundColor: "#3C8C7E" }}
                onChange={handleFileChange}
              />
            </div> */}
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default EditData