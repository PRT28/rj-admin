import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./AppRoutes.js";
import { useCookies } from "react-cookie";
import Login from "./components/Auth/Login.js";
import { DASHBOARD_API } from "./util/api.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadAdmin } from "./slices/adminSlice.js";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios({
          method: "get",
          url: DASHBOARD_API,
          headers: {
            Authorization: cookies.token,
          },
        });
        if (response.status === 200) {
          dispatch(loadAdmin(response.data.user));
          // 2 means user so not allowed
          if (response.data.user.role === 2) {
            alert("User Sign in not allowed");
            setAuth(false);
          } else setAuth(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    console.log(cookies)
    if (!cookies.token) {
      setAuth(false);
    } else {
      fetchUserDetails();
    }
  }, [dispatch, cookies]);

  return (
    <div key="app">
      {!cookies.token ?<Login /> : <AppRoutes />}
    </div>
  );
};

export default App;
