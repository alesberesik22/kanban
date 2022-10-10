import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NewColumnModal.css";

const NewColumnModal = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    props.setNewColumn(false);
  };
  useEffect(() => {
    setOpen(props.newColumn);
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="newColumn_modal">test</Box>
      </Modal>
    </div>
  );
};

export default NewColumnModal;
