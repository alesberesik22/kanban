import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const [clicked, setClicked] = useState("");
  return (
    <div className="navbar">
      <div className="navbar_header">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar_create_kanban">
        <button>New Kanban</button>
      </div>
      <div className="navbar_menu">
        <div className="navbar_menu_home">
          <div
            className={`navbar_menu_home ${
              clicked === "Home" ? "navbar_menu_active" : ""
            }`}
            onClick={() => {
              navigate("/");
              setClicked("Home");
            }}
          >
            <span>
              <AiOutlineHome
                className={`${clicked === "Home" ? "icon_active" : ""}`}
              />
            </span>
            Home
          </div>
        </div>
        <div className="navbar_menu_home">
          <div
            className={`navbar_menu_home ${
              clicked === "Kanban" ? "navbar_menu_active" : ""
            }`}
            onClick={() => {
              navigate("/kanban");
              setClicked("Kanban");
            }}
          >
            <span>
              <AiOutlineHome
                className={`${clicked === "Kanban" ? "icon_active" : ""}`}
              />
            </span>
            Kanban
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
