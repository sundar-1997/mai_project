import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "../SharedComponents/ScrollToTop";
import Login from "../Pages/Login";
import { useSelector } from "react-redux";
import PageForbidden from "../SharedComponents/403";
import PageNotFound from "../SharedComponents/404";
import Chatroompage from "../Pages/Chatroom";
import Registerpage from "../Pages/Register";

// Icons
import { Dashboard } from "@mui/icons-material";

const Router = () => {
  const isAuthenticated = useSelector(
    (state) => state?.AuthReducer?.isAuthenticated || false
  );

  const PrivateRoute = ({ page }) => {
    if (isAuthenticated) {
      return page;
    } else return <Navigate to="/" />;
  };


  const HomeRoute = () => {
    if (isAuthenticated) {
      return <Navigate replace to="/chatroom" />;
    } else return <Login />;
  };

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
<Route path="/" element={<HomeRoute />} />
<Route path="/chatroom" element={<PrivateRoute page={<Chatroompage />}></PrivateRoute>} />
<Route path="/register" element={<Registerpage />} />
<Route path="/403" element={<PageForbidden />} />
<Route path="/*" element={<PageNotFound />} />

        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
