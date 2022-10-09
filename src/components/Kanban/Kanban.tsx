import React, { useState } from "react";
import Card from "../Card/Card";
import "./Kanban.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";

const itemsFromBackend = [
  { id: 0, content: "first task" },
  { id: 1, content: "second task" },
];

const columnsFromBackend = [{ id: 1, name: "To Do", items: itemsFromBackend }];

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [hover, setHover] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut nemo sint tempore quidem commodi ratione. Officiis, illo labore architecto dolore aut iste tenetur nulla consectetur, tempora provident nostrum minima molestias!"
  );
  const cancelEditHover = () => {
    if (!edit) {
      setHover(false);
    }
  };
  const editHeader = () => {
    setEdit((prev) => !prev);
  };
  return (
    <div className="kanban">
      <div className="kanban_container">
        <div
          className="kanban_header"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={cancelEditHover}
        >
          <div className="kanban_header_title">
            <input
              value={title}
              disabled={!edit}
              onChange={(e) => setTitle(e.target.value)}
            />
            {hover && (
              <div className="kanban_header_title_edit" onClick={editHeader}>
                {!edit ? (
                  <AiFillEdit />
                ) : (
                  <AiOutlineCheck style={{ color: "green" }} />
                )}
              </div>
            )}
          </div>
          <div className="kanban_header_desription">
            <textarea
              value={text}
              disabled={!edit}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <div className="kanban_body">
          <DragDropContext onDragEnd={(event) => console.log(event)}>
            {columns.map((column) => (
              <Droppable droppableId={String(column.id)}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "lightgrey",
                      padding: 4,
                      width: 250,
                      minHeight: 500,
                    }}
                  >
                    <Draggable
                      key={column.id}
                      draggableId={String(column.id)}
                      index={column.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.draggableProps}
                          style={{
                            userSelect: "none",
                            padding: 16,
                            margin: " 0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                              ? "#263B4A"
                              : "#456C86",
                            color: "white",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {"test"}
                        </div>
                      )}
                    </Draggable>
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
