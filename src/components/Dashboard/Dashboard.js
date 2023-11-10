import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import { loadDashboard } from "../../slices/dashboardSlice";
import {
  CATEGORY_API,
  KEYWORD_API,
  PUZZLE_API,
  JOY_API,
  COMMITMENT_API,
  WACK_API,
} from "../../util/api";
// Sub Components
import TotalData from "./sub-components/TotalData";
import { DoughNutChart, BarChart } from "./sub-components/Chart";

function Dashboard() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);

  const ResponseArray = [[], [], [], [], [], []];

  // Function to fetch all the data
  const fetchApi = async (api) => {
    try {
      const response = await axios({
        method: "get",
        url: api,
        headers: {
          Authorization: cookies.token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const api_get = [
      JOY_API.getAllJoy,
      CATEGORY_API.getAllCategory,
      KEYWORD_API.getAllKeyword,
      PUZZLE_API.getAllPuzzle,
      COMMITMENT_API.getAllCommitment,
      WACK_API.getAllWack,
    ];

    // Use Promise.all to fetch data from all APIs concurrently
    Promise.all(api_get.map(fetchApi))
      .then((responses) => {
        // Set the ResponseArray with the responses
        ResponseArray[0] = responses[0];
        ResponseArray[1] = responses[1];
        ResponseArray[2] = responses[2];
        ResponseArray[3] = responses[3];
        ResponseArray[4] = responses[4];
        ResponseArray[5] = responses[5];

        // Dispatch an action to store ResponseArray in Redux
        dispatch(loadDashboard(ResponseArray));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const { loading, data: dashboardData } = useSelector(
    (state) => state.dashboard
  );
  console.log("From Dashboard Redux", dashboardData);

  return (
    <div className="dashboard container ">
      <div className="nav-items fs-4 pb-3">
        <span className="d-none text-sm text-dark d-sm-inline h5">
          Dashboard
        </span>
      </div>
      {/* Load when data is fetched */}
      {!loading && dashboardData ? (
        <>
          <TotalData data={dashboardData} />
          <div className="row">
            <div
              className="col-sm-9 card border mx-2 shadow-lg p-3 mb-5 "
              style={{ borderRadius: "20px" }}
            >
              <div className="h1">
                {!loading && dashboardData && (
                  <BarChart ChartData={dashboardData} />
                  // <>Chart</>
                )}
              </div>
            </div>
            <div
              className="col-sm card border mx-2 shadow-lg p-3 pt-5 mb-5 "
              style={{ borderRadius: "20px" }}
            >
              <div className="h1">
                {!loading && dashboardData && (
                  <DoughNutChart ChartData={dashboardData} />
                  // <>Chart.js</>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="align-items-center d-flex justify-content-center ">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
