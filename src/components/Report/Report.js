import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REPORT_API } from "../../util/api";
import DataTable from "../DataTable";
import { loadReport } from "../../slices/reportSlice";
import { useCookies } from "react-cookie";
import axios from "axios";

function Report() {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  const fetchApi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: REPORT_API.getAllReport,
        headers: {
          Authorization: cookies.token,
        },
      });
      console.log("report",response)
      if (response.status === 200) return dispatch(loadReport(response.data));
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [dispatch]);

  // get the data from the state.
  const { loading, data: reportData } = useSelector((state) => state.report);

  const fields = [
    "action",
    // "assetDetails",
    // {_id: '64f766af96ae161a2b03a3b6', user_id: '64f0f8510c0f8fdc3dbc2766', category_id: '64f4ae167efd44f420dfa750', keyword_name: Array(0), url: 'http://example.com', …}
    "asset_id",
    "report_text",
    // "userDetails",
    // {_id: '64f1ee668796eb5d021bd961', username: 'manas', email: 'manas@gmail.com', password: '$2b$10$kL6.6vGa9VVcSwWqwX9mpOAcEJ7wN9J/1nvmW6Y0pD7YuCoDbZM9S', status: true, …}
    "user_id",
  ];

  return (
    <div className="dashboard container vh-100">
      <div className="nav-items fs-4 ">
        <span className="d-none text-sm text-light d-sm-inline h5">Report</span>
      </div>
      <div className="row">
        <div className="">
          {!loading && reportData ? (
            <DataTable
              actualData={reportData}
              fields={fields}
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
  );
}
export default Report;

// reprot name
// asserts
// toggle button
