import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./NewKanbanModal.css";
import { useCreateKanbanMutation } from "../Services/kanbanAPI";

const NewKanbanModal = (props: any) => {
  const [createKanban, responseCreateKanban] = useCreateKanbanMutation();
  const [open, setOpen] = useState(false);
  const [kanbanName, setKanbanName] = useState("");
  const handleClose = () => {
    setOpen(false);
    props.setCreateKanban(false);
  };
  const cancel = () => {
    setOpen(false);
    props.setCreateKanban(false);
    setKanbanName("");
  };
  const confirm = async () => {
    const payload = {
      kanban_name: kanbanName,
    };
    await createKanban(payload);
    setKanbanName("");
    setOpen(false);
    props.setCreateKanban(false);
  };
  useEffect(() => {
    setOpen(props.createKanban);
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="create_kanban_modal">
          <div className="create_kanban_container">
            <div className="create_kanban_header">
              <h2>New Kanban</h2>
            </div>
            <div className="create_kanban_body">
              <input
                required
                value={kanbanName}
                onChange={(e) => setKanbanName(e.target.value)}
                placeholder="Kanban name"
              />
            </div>
            <div className="create_kanban_buttons">
              <button onClick={confirm}>Confirm</button>
              <div className="cancel_kanban" onClick={cancel}>
                Cancel
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default NewKanbanModal;
