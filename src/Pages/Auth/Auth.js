import "./styles/Login.css";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./ResetPassword";

export default function Auth() {
  return (
    <div className="Auth">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}
