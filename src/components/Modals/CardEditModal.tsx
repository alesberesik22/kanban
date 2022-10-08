import React, { useState, useEffect, useRef } from "react";
import "./CardEditModal.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useAutosizeTextArea from "./useAutoResizeTextArea";

const CardEditModal = (props: any) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const id = props.id;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("title");
  const [text, setText] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut nemo sint tempore quidem commodi ratione. Officiis, illo labore architecto dolore aut iste tenetur nulla consectetur, tempora provident nostrum minima molestias!"
  );
  const closeModal = () => {
    props.setShowCardEditModatl(false);
    props.setHover("");
    setOpen(false);
  };
  useEffect(() => {
    setOpen(props.cardEdit);
    console.log(id);
  }, []);
  const changeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const changeText = (e: any) => {
    setText(e.target.value);
  };
  useAutosizeTextArea(textAreaRef.current, text);
  return (
    <div>
      <Modal open={open} onClose={closeModal}>
        <Box className="card_edit_modal">
          <div className="card_edit_modal_container">
            <div className="card_edit_modal_container_header">
              <input type={"text"} value={title} onChange={changeTitle} />
            </div>
            <div className="card_edit_modal_container_description">
              <textarea
                value={text}
                onChange={changeText}
                ref={textAreaRef}
              ></textarea>
            </div>
            <div className="card_edit_modal_container_description_buttons">
              <button>Confirm</button>
              <div>Cancel</div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardEditModal;
