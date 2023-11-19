import React, { useState } from "react";
import EditData from "./EditData";
import {AiFillDelete, AiTwotoneEdit} from 'react-icons/ai'

const DataTable = ({ actualData, fields, editableFields, delete_API, action, edit_API,showData,delete_func,edit_func
}) => {
  // Set the Data to be actual when no show data is provided
  let Data = showData === undefined ? actualData : showData;
  console.log("DataTable Data", Data);

  const [edit, setEdit] = useState({
    isEdit: false,
    index: null,
  });
  
  // const handleEdit = (e) => {
  // setEditData({ ...editData, [e.target.name]: e.target.value });
  // };

  if (edit.isEdit) {
    return (
      <EditData editableFields={editableFields} fields={fields} index={edit.index} isEdit={edit.isEdit} edit_API={edit_API} action={action} setEdit={setEdit} edit_func={edit_func}/>
    )
  }
  return (
    <div className="  h-100 mt-1 vh-100">
      {/* Search Component  */}
      <div className="row mt-4 mb-3 d-flex">
        <div className="col-sm-12 align-items-center d-flex ">

          <input
            type="text"
            name="searchText"
            className="form-control shadow-lg p-2 px-3"
            placeholder="Search here"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            style={{ borderRadius: "20px", backgroundColor: '#5D5D5D', color: '#FFF' }}
          />
        </div>
      </div>

      {/* Data Table */}
      <div
        className="overflow-auto"
      >
        <table className=" table" style={{ border: "1px solid white" }}>
          {Data.length > 0 ? (
            <>
              {/* Displaying Data Heads */}
              <thead>
                <tr>
                  {fields.map((title) => {
                    title = title[0].toUpperCase() + title.slice(1);
                    title = title.replace(/_/g, " ");
                    return (
                      <th
                        key={title}
                        scope="col"
                        style={{ backgroundColor: "#3D3D3D", padding: "15px", color: "white" }}
                      >
                        {title}
                      </th>
                    );
                  })}
                  <th style={{ backgroundColor: "#3D3D3D", padding: "15px", color: "white" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Displaying Data */}
                {Data.map((elem, index) => {
                  return (
                    <tr key={index}>
                      {/* Map data through Fields so that every field gets mapped even though response data doesh't contain them */}
                      {fields.map((keys) => {
                        return (
                          <td
                            key={keys}
                            style={{ backgroundColor: "#5E5E5E" }}
                          >
                            {elem[keys] ? 
                            elem[keys] : "No Entry"}
                          </td>
                        );
                      })}
                      <td style={{ backgroundColor: "#5E5E5E" }}>
                         <AiTwotoneEdit className="fa-solid fa-pen-to-square mx-2" style={{color: '#63C5CB'}} onClick={(e) => edit_func(e, elem)} />  
                        <AiFillDelete
                          className="fas fa-trash mx-2"
                          style={{ color: "#FF7272" }}
                          onClick={(e) => delete_func(e, elem)}
                         />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td colSpan={1} className="text-center">
                  No Data
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
export default DataTable;
