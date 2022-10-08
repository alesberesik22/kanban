import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import "./Card.css";
import CardViewModal from "../Modals/CardViewModal";
import CardEditModal from "../Modals/CardEditModal";

const Card = () => {
  const [hover, setHover] = useState("");
  const [cardModal, setCardModal] = useState(false);
  const [cardEdit, setCardEdit] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut nemo sint tempore quidem commodi ratione. Officiis, illo labore architecto dolore aut iste tenetur nulla consectetur, tempora provident nostrum minima molestias!"
  );
  const showModal = () => {
    setCardModal(true);
    setCardEdit(false);
  };
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
          <h2>Title</h2>
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
      </div>
      {cardModal && (
        <CardViewModal
          cardModal={cardModal}
          setShowCardModal={setCardModal}
          setHover={setHover}
          id={"text"}
        />
      )}
      {cardEdit && (
        <CardEditModal
          cardEdit={cardEdit}
          setShowCardEditModatl={setCardEdit}
          setHover={setHover}
          id={"text"}
        />
      )}
    </div>
  );
};

export default Card;