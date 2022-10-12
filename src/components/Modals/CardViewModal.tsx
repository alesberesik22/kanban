import React, { useEffect, useState } from "react";
import "./CardViewModal.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const CardViewModal = (props: any) => {
  const id = props.id;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut nemo sint tempore quidem commodi ratione. Officiis, illo labore architecto dolore aut iste tenetur nulla consectetur, tempora provident nostrum minima molestias!"
  );
  const [header, setHeader] = useState("Title");
  const handleClose = () => {
    props.setShowCardModal(false);
    setOpen(false);
  };
  useEffect(() => {
    setOpen(props.cardModal);
    props.setHover("");
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="card_view_modal">
          <div className="card_view_modal_container">
            <div className="card_view_modal_cantainer_header">
              <h2>{header}</h2>
            </div>
            <div className="card_view_modal_container_description">
              <span>{text}</span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardViewModal;
