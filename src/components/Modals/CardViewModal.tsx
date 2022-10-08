import React, { useEffect, useState } from "react";
import "./CardViewModal.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CardViewModal = (props: any) => {
  const id = props.id;
  const [open, setOpen] = useState(false);
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
              <h2>{props.title}</h2>
            </div>
            <div className="card_view_modal_container_description">
              <span>{props.description}</span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardViewModal;
