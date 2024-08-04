import "./Header.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { logout } from "../../axiosConfig/Auth";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(Cookies.get("token_shipment") ? true : false);
  }, []);

  const handleVisibleHeader = () => {
    const scrollWindow = window.pageYOffset;
    setIsVisible(position > scrollWindow || scrollWindow < 10);
    setPosition(scrollWindow);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleHeader);
    return () => {
      window.removeEventListener("scroll", handleVisibleHeader);
    };
  }, [position]);

  const handleLogout = () => {
    setTimeout(() => {
      logout();
      navigate("/auth/login");
    }, 500);
  };

  return (
    <div
      className={`Header flex-center-between ${
        isVisible ? "visible" : "hidden"
      }`}
    >
      <a href="/" className="logo">
        <h3>logo name</h3>
      </a>

      <nav className="navbar flex-center-between">
        <ul className="list flex-center-between">
          <li className="radius-3">
            <Link to="#">about us</Link>
          </li>
          <li className="radius-3">
            <Link to="#">contact us</Link>
          </li>
        </ul>
        <div className="auth">
          {isAuth ? (
            <Link to="#" onClick={handleLogout}>
              <LuLogOut />
            </Link>
          ) : (
            <Link to="/auth">
              <BiUser />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
