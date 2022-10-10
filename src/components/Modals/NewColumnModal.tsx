import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NewColumnModal.css";

const NewColumnModal = (props: any) => {
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState("");
  const handleClose = () => {
    setOpen(false);
    props.setNewColumn(false);
  };
  const confirmColumn = () => {
    const payload = {
      id: 3,
      name: String(columnName),
      items: [],
    };
    props.setAddColumn((oldarray: any) => [...oldarray, payload]);
    setColumnName("");
    setOpen(false);
    props.setNewColumn(false);
  };
  useEffect(() => {
    setOpen(props.newColumn);
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="newColumn_modal">
          <div className="new_column_modal_container">
            <div className="new_column_modal_container_header">
              <h2>Add new column</h2>
            </div>
            <div className="new_column_modal_container_input">
              <input
                type={"text"}
                required
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
              ></input>
            </div>
            <div className="new_column_modal_container_buttons">
              <button onClick={confirmColumn}>Confirm</button>
              <div className="cancel" onClick={handleClose}>
                Cancel
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default NewColumnModal;
