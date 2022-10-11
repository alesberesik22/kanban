import { Box, MenuItem, Modal } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import React, { useEffect, useState } from "react";
import "./CreateTaskModal.css";

const CreateTaskModal = (props: any) => {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const handleClose = () => {
    setOpen(false);
    props.setCreateTask(false);
  };
  const createTask = () => {
    const payload = {
      id: Math.floor(Math.random() * (100 - 10 + 1) + 10),
      title: title,
      content: context,
      priority: priority,
    };
    props.setColumns((oldArray: []) =>
      oldArray.map((item: any) => {
        if (item.id === props.columnID) {
          console.log(props.columnID);
          console.log(item);
          return [...item.items, payload];
        }
      })
    );
    setOpen(false);
    props.setCreateTask(false);
  };
  const cancelTask = () => {
    setPriority("");
    setTitle("");
    setContext("");
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
          <div className="create_task_modal_container">
            <div className="create_task_modal_container_header">
              <h2>Create task</h2>
            </div>
            <div className="create_task_modal_container_task">
              <input
                required
                placeholder="Task Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                required
                placeholder="Task Description"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="select_priority">Priority</InputLabel>
                <Select
                  labelId="select_priority"
                  id="select"
                  value={priority}
                  label="Priority"
                  onChange={(e: SelectChangeEvent) =>
                    setPriority(e.target.value)
                  }
                  className="select"
                >
                  <MenuItem value={"Easy"}>Easy</MenuItem>
                  <MenuItem value={"Mediu"}>Medium</MenuItem>
                  <MenuItem value={"Critical"}>Critical</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="create_task_modal_container_buttons">
              <button onClick={createTask}>Confirm</button>
              <div onClick={cancelTask}>Cancel</div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
