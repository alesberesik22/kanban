import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import "./Card.css";
import CardViewModal from "../Modals/CardViewModal";
import CardEditModal from "../Modals/CardEditModal";

const Card = (props: any) => {
  const [hover, setHover] = useState("");
  const [priority, setPriority] = useState({});
  const [cardModal, setCardModal] = useState(false);
  const [cardEdit, setCardEdit] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.content);
  const showModal = () => {
    setCardModal(true);
    setCardEdit(false);
  };
  useEffect(() => {
    if (props.priority === "Easy") {
      setPriority({ background: "aqua" });
    } else if (props.priority === "Medium") {
      setPriority({ background: "yellow" });
    } else if (props.priority === "Critical") {
      setPriority({ background: "red" });
    } else {
      setPriority({ background: "aqua" });
    }
  }, []);
  return (
    <div
      className="card"
      key={"card"}
      id={"card"}
      onMouseEnter={(e) => setHover(e.currentTarget.id)}
      onMouseLeave={(e) => setHover("")}
    >
      <div className="card_container">
        <div className="card_container_header">
          <h2 style={{ color: "black" }}>{props.title}</h2>
          {hover === "card" ? (
            <div className="card_container_settings">
              <div className="card_container_header_close">
                <AiOutlineClose />
              </div>
              <div
                className="card_container_header_settings"
                onClick={() => setCardEdit(true)}
              >
                <FiSettings />
              </div>
            </div>
          ) : null}
        </div>
        <div className="card_container_text" onClick={showModal}>
          <span>
            {text.length > 250 ? text : text.substring(0, 150) + "...   "}
          </span>
        </div>
        <div className="card_importance" style={priority}></div>
      </div>
      {cardModal && (
        <CardViewModal
          cardModal={cardModal}
          setShowCardModal={setCardModal}
          setHover={setHover}
          id={props.id}
        />
      )}
      {cardEdit && (
        <CardEditModal
          cardEdit={cardEdit}
          setShowCardEditModatl={setCardEdit}
          setHover={setHover}
          id={props.id}
          setNewTitle={setTitle}
          setNewText={setText}
          title={title}
          text={text}
        />
      )}
    </div>
  );
};

export default Card;
