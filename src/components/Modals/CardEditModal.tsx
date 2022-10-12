import React, { useState, useEffect, useRef } from "react";
import "./CardEditModal.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useAutosizeTextArea from "./useAutoResizeTextArea";
import EmojiPicker, { Theme } from "emoji-picker-react";

const CardEditModal = (props: any) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const id = props.id;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const closeModal = () => {
    props.setShowCardEditModatl(false);
    props.setHover("");
    setOpen(false);
  };
  useEffect(() => {
    setOpen(props.cardEdit);
  }, []);
  const changeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const changeText = (e: any) => {
    setText(e.target.value);
  };
  const confirmEdit = () => {
    console.log(title);
    props.setNewTitle(title);
    props.setNewText(text);
    props.setShowCardEditModatl(false);
    setOpen(false);
  };
  useAutosizeTextArea(textAreaRef.current, text);
  return (
    <div>
      <Modal open={open} onClose={closeModal}>
        <Box className="card_edit_modal">
          <div className="card_edit_modal_container">
            <div className="card_edit_modal_container_header">
              <input type={"text"} value={title} onChange={changeTitle} />
              {/* <div className="emoji_picker">
                <EmojiPicker
                  onEmojiClick={(e) => console.log(e)}
                  autoFocusSearch={false}
                  theme={Theme.AUTO}
                />
              </div> */}
            </div>
            <div className="card_edit_modal_container_description">
              <textarea
                value={text}
                onChange={changeText}
                ref={textAreaRef}
              ></textarea>
            </div>
            <div className="card_edit_modal_container_description_buttons">
              <button onClick={confirmEdit}>Confirm</button>
              <div>Cancel</div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardEditModal;
