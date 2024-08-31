import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { counters } from "./router";

import { Fragment, useEffect } from "react";
import DefaultComponent from "./componet/DefaultComponent/DefaultComponent";
import { JsonToParse } from "./utils/JsontoParse";
import { jwtDecode } from "jwt-decode";
import { axiosJWT, userAPI } from "./Api/UserAPI";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./Redux/counter/UserSlide";

function App() {
  const inforUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const { decoded, storangeData } = handleDecode();
    if (decoded.id) {
      handleGetUserDetail(decoded.id, storangeData);
    }
  });

  const handleDecode = () => {
    let decoded = {};
    let storangeData = localStorage.getItem("access_token");
    if (storangeData && JsonToParse(storangeData)) {
      storangeData = JSON.parse(storangeData);
      decoded = jwtDecode(storangeData);
    }
    return {
      decoded,
      storangeData,
    };
  };

  // Add a request interceptor
  axiosJWT.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
      const refreshTokenLocal = JSON.parse(
        localStorage.getItem("refresh_token")
      );
      const decodeRefreshToken = jwtDecode(refreshTokenLocal);
      const currentDay = new Date();
      const { decoded } = handleDecode();
      console.log("decoded", decoded);
      console.log("time", currentDay.getTime() / 1000);
      if (decoded?.exp < currentDay.getTime() / 1000) {
        if (decodeRefreshToken?.exp > currentDay.getTime() / 1000) {
          console.log("refresh");
          const res = await userAPI.refreshToken(refreshTokenLocal);

          const data = res.data.access_token;
          config.headers["token"] = `Bearer ${data}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },

    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  const handleGetUserDetail = async (id, access_token) => {
    const res = await userAPI.getUserDetail(id, access_token);
    dispatch(updateUser(res.data));
  };
  return (
    <div className="App" style={{ backgroundColor: "#efefef" }}>
      <BrowserRouter>
        <Routes>
          {counters.map((counter) => {
            const Page = counter.page;
            const isCheckAuth = !counter?.isPrivate || inforUser?.isAdmin;
            const Layout = counter.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={counter.path}
                path={isCheckAuth ? counter.path : undefined}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }></Route>
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
