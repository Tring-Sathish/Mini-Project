import "./App.css";
import { Routes, Route } from "react-router-dom";

import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Registration from "./Pages/Auth/Registration";
import Login from "./Pages/Auth/Login";
import HomePage from "./Pages/Dashboard/HomePage";
import VerifyOPT from "./Pages/Auth/VerifyOPT";
import EnterNewPassword from "./Pages/Auth/EnterNewPassword";
import NotPageFound404 from "./Pages/Dashboard/NotPageFound404";

function App() {

  const org_id = localStorage.getItem("organization_id")

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NotPageFound404 />} />{" "}
        <Route path="/verifyotp" element={<VerifyOPT />} />
        <Route path="/newpassword" element={<EnterNewPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpwd" element={<ForgetPassword />} />
        <Route path="/register" element={<Registration />} />
      </Routes>{" "}
    </div>
  );
}

export default App;