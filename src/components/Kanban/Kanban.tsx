import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Kanban.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  AiFillEdit,
  AiOutlineCheck,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { motion } from "framer-motion";
import NewColumnModal from "../Modals/NewColumnModal";
import CreateTaskModal from "../Modals/CreateTaskModal";
import { useGetKanbanTasksQuery } from "../Services/kanbanAPI";
import { useParams } from "react-router-dom";

const Kanban = () => {
  const { kanbanID } = useParams();
  const {
    data: KanabanData,
    isFetching: KanbanFetching,
    refetch: KanbanRefetch,
  } = useGetKanbanTasksQuery(kanbanID);
  console.log(KanabanData);
  const [counter, setCounter] = useState(0);
  const [columns, setColumns] = useState<any>([]);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("Test");
  const [hover, setHover] = useState(false);
  const [createTaskId, setCreateTaskId] = useState<Number>();
  const [newModal, setNewModal] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut nemo sint tempore quidem commodi ratione. Officiis, illo labore architecto dolore aut iste tenetur nulla consectetur, tempora provident nostrum minima molestias!"
  );
  const cancelEditHover = (e: any) => {
    e.preventDefault();
    if (!edit) {
      setHover(false);
    }
  };
  const editHeader = () => {
    setEdit((prev) => !prev);
  };
  useEffect(() => {
    console.log(columns);
  }, [createTask]);
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      console.log(source);
      const sColumn = columns.find(
        (x: any) => x.id === Number(source.droppableId)
      );
      const destColumn = columns.find(
        (x: any) => x.id === Number(destination.droppableId)
      );
      const sourceItems = [...sColumn!.items];
      const destItems = [...destColumn!.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((item: any) => {
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
        columns.map((item: any) => {
          if (item.id === Number(source.droppableId)) {
            return { ...item, items: coppiedItems };
          } else {
            return item;
          }
        })
      );
    }
  };
  useEffect(() => {
    if (KanabanData !== undefined) {
      setColumns(KanabanData);
    }
  }, [KanabanData]);
  if (KanbanFetching) {
    return <div>Loading</div>;
  }
  return (
    <div className="kanban">
      <div className="kanban_container">
        <div
          className="kanban_header"
          onMouseEnter={(e) => {
            e.preventDefault();
            setHover(true);
          }}
          onMouseLeave={cancelEditHover}
        >
          <div className="kanban_header_title">
            <input
              value={title}
              disabled={!edit}
              onChange={(e) => setTitle(e.target.value)}
            />

            {hover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="kanban_header_title_edit"
              >
                <div
                  className="kanban_header_title_addBoard"
                  onClick={() => setNewModal(true)}
                >
                  <span style={{ marginRight: "10px" }}>
                    <AiOutlinePlusSquare className="addBoard" />
                  </span>
                  New Board
                </div>
                {!edit ? (
                  <AiFillEdit
                    style={{ color: "#562bf7" }}
                    onClick={editHeader}
                    className="edit_button"
                  />
                ) : (
                  <AiOutlineCheck
                    style={{ color: "green" }}
                    onClick={editHeader}
                    className="edit_button"
                  />
                )}
              </motion.div>
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
          <div className="kanban_body_container">
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {columns &&
                columns.map((column: any) => (
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
                        width: "19rem",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
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
                      <AiOutlinePlusSquare
                        className="add_task"
                        onClick={() => {
                          setCreateTask(true);
                          setCreateTaskId(column.id);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "19rem",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "40px",
                      }}
                    >
                      <Droppable
                        droppableId={String(column.id)}
                        key={column.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              padding: 4,
                              width: "18rem",
                              height: 500,
                              borderRadius: 15,
                            }}
                            className="column"
                          >
                            {column.items.map((item: any, index: any) => (
                              <Draggable
                                key={item.task_id}
                                draggableId={String(item.task_id)}
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
                                      margin: "0 0 15px 0",
                                      minHeight: "50px",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Card
                                      title={item.task_title}
                                      content={item.task_content}
                                      id={item.task_id}
                                      priority={item.task_priority}
                                      tasks={columns}
                                      setTasks={setColumns}
                                    />
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
      {newModal && (
        <NewColumnModal
          newColumn={newModal}
          setNewColumn={setNewModal}
          setAddColumn={setColumns}
        />
      )}
      {createTask && (
        <CreateTaskModal
          columnID={createTaskId}
          setColumns={setColumns}
          createTask={createTask}
          setCreateTask={setCreateTask}
        />
      )}
    </div>
  );
};

export default Kanban;
