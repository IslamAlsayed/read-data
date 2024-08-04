import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [position, setPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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

  return (
    <div className={`Header flex-between ${isVisible ? "visible" : "hidden"}`}>
      <a href="/" className="logo">
        <h3>logo name</h3>
      </a>

      <nav className="navbar flex-between">
        <ul className="list flex-between">
          <li className="radius-3">
            <Link to="#">about us</Link>
          </li>
          <li className="radius-3">
            <Link to="#">contact us</Link>
          </li>
        </ul>
        <div className="auth">
          <Link to="/auth">
            <i className="fas fa-user"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
}
