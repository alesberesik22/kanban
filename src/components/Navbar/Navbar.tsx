import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import NewKanbanModal from "../Modals/NewKanbanModal";
import { useGetKanbansQuery } from "../Services/kanbanAPI";

const Navbar = () => {
  const {
    data: kanbanData,
    isFetching: KanbansFetching,
    refetch: KanbanRefetch,
  } = useGetKanbansQuery();
  let navigate = useNavigate();
  const [createKanban, setCreateKanban] = useState(false);
  const [clicked, setClicked] = useState("");
  const [kanbans, setKanbans] = useState([]);
  useEffect(() => {
    if (!KanbansFetching) {
      console.log(kanbanData);
      setKanbans(kanbanData);
    }
  }, [KanbansFetching]);
  useEffect(() => {
    if (!createKanban) KanbanRefetch();
  }, [createKanban]);
  if (KanbansFetching) {
    return <div>Loading...</div>;
  }
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
          {kanbans.map((kanban: any) => (
            <div
              className={`navbar_menu_home_kanban ${
                clicked === kanban.kanban_name ? "navbar_menu_active" : ""
              }`}
              onClick={() => {
                navigate(`/kanban/${kanban.kanban_id}`);
                setClicked(kanban.kanban_name);
              }}
              key={kanban.kanban_id}
            >
              <span>
                <AiOutlineHome
                  className={`${
                    clicked === kanban.kanban_name ? "icon_active" : ""
                  }`}
                />
              </span>
              {kanban.kanban_name}
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
