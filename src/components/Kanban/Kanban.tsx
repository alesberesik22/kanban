import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Kanban.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";

const itemsFromBackend = [
  { id: 0, content: "first task" },
  { id: 1, content: "second task" },
];
const items2FromBackend = [
  { id: 3, content: "third task" },
  { id: 4, content: "forth task" },
];

const columnsFromBackend = [
  { id: 0, name: "To Do", items: itemsFromBackend },
  { id: 1, name: "In Progress", items: items2FromBackend },
  { id: 2, name: "Done", items: [] },
];

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("Test");
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
  useEffect(() => {
    console.log(items2FromBackend);
  }, [columns]);
  const onDragEnd = (result: any) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((item) => {
          if (item.id === Number(source.droppableId)) {
            return {
              ...item,
              items: sourceItems,
            };
          }
          if (item.id === Number(destination.droppableId)) {
            return {
              ...item,
              items: destItems,
            };
          } else {
            console.log(item.id, "neni som tu");
            return item;
          }
        })
      );
    } else {
      const column = columns[source.droppableId];
      const coppiedItems = [...column.items];
      const [removed] = coppiedItems.splice(source.index, 1);
      coppiedItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((item) => {
          if (item.id === Number(source.droppableId)) {
            console.log(item.id, "som tu");
            return { ...item, items: coppiedItems };
          } else {
            console.log(item.id, "neni som tu");
            return item;
          }
        })
      );
    }
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
                  <AiFillEdit style={{ color: "aqua" }} />
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
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {columns.map((column) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={column.id}
              >
                <div
                  style={{
                    width: "100%",
                    marginLeft: "45px",
                  }}
                >
                  <h2
                    style={{
                      width: "80%",
                      color: "grey",
                    }}
                    className="header"
                  >
                    {column.name}
                  </h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "19rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Droppable droppableId={String(column.id)} key={column.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          padding: 4,
                          width: "16rem",
                          height: 500,
                          borderRadius: 15,
                        }}
                        className="column"
                      >
                        {column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: 0,
                                  margin: "0 0 8px 0",
                                  minHeight: "50px",
                                  color: "white",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <Card />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
