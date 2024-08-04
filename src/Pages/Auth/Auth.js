import "./styles/Login.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

export default function Auth() {
  return (
    <div className="Auth">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}
