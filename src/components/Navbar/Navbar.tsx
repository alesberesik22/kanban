import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import NewKanbanModal from "../Modals/NewKanbanModal";

const initialState = {
  id: 0,
  kanban: "Kanban",
};
const Navbar = () => {
  let navigate = useNavigate();
  const [createKanban, setCreateKanban] = useState(false);
  const [clicked, setClicked] = useState("");
  const [kanbans, setKanbans] = useState([initialState]);
  return (
    <div className="navbar">
      <div className="navbar_header">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar_create_kanban">
        <button onClick={() => setCreateKanban(true)}>New Kanban</button>
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
        <div className="navbar_menu_home_kanbans">
          {kanbans.map((kanban) => (
            <div
              className={`navbar_menu_home_kanban ${
                clicked === kanban.kanban ? "navbar_menu_active" : ""
              }`}
              onClick={() => {
                navigate(`/kanban/${kanban.id}`);
                setClicked(kanban.kanban);
              }}
            >
              <span>
                <AiOutlineHome
                  className={`${
                    clicked === kanban.kanban ? "icon_active" : ""
                  }`}
                />
              </span>
              {kanban.kanban}
            </div>
          ))}
        </div>
      </div>
      {createKanban && (
        <NewKanbanModal
          createKanban={createKanban}
          setCreateKanban={setCreateKanban}
          setNewKanban={setKanbans}
        />
      )}
    </div>
  );
};

export default Navbar;
