import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CreateTaskModal.css";

const CreateTaskModal = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    props.setCreateTask(false);
  };
  useEffect(() => {
    setOpen(props.createTask);
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="create_task_modal">
          <div className="create_task_modal_container">{props.columnID}</div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
