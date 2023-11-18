import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadJoy } from "../../slices/joySlice";
import { JOY_API } from "../../util/api";
import DataTable from "../DataTable";
import axios from "axios";
import { useCookies } from "react-cookie";

function ManageJoy() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);

  const { data: adminData } = useSelector((state) => state.admin);

  const joyDelete = async (e, elem) => {
    try {
      const response = await axios({
        method: "delete",
        url: JOY_API.deleteJoy + `${elem._id}`,
        data: {
          user_id: adminData._id,
        },
      });
      if (response.status === 200) return dispatch(loadJoy(response.data));
    } catch (err) {
      console.log(err, err.response);
    }
  };

  const fetchApi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: JOY_API.getAllJoy,
        headers: {
          Authorization:
            // cookies.token,
            cookies.token,
        },
      });
      // Dispatch the data to the puzzleSlice to be stored in the store
      dispatch(loadJoy(response.data));
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  // get the data from the state.
  const { loading, data: joyData } = useSelector((state) => state.joy);
  console.log("From ManageJoy:", joyData);

  const fields = [
    "name",
    "url",
    "asset_type",
    "isActive",
    "keyword_name",
    "like_count",
    "share_count",
  ];

  return (
    <div className="dashboard container vh-100">
      <div className="nav-items fs-4 ">
        <span className="d-none text-sm text-light d-sm-inline h6 ">
          {`Joy-> Manage Joy`}
        </span>
      </div>
      <div className="row">
        <div>
          <div className="" style={{ borderRadius: "20px" }}>
            {!loading && joyData ? (
              <DataTable
                actualData={joyData}
                fields={fields}
                delete_func={joyDelete}
                editableFields={[""]}
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
    </div>
  );
}
export default ManageJoy;
