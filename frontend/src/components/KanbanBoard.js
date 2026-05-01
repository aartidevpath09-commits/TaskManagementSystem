import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { getTasks, updateTask } from "../services/api";

// 🎨 STEP 1: Column Colors
const columnStyles = {
  Pending: { background: "#fff3cd" },
  "In Progress": { background: "#cce5ff" },
  Done: { background: "#d4edda" },
};

const initialColumns = {
  Pending: [],
  "In Progress": [],
  Done: [],
};

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialColumns);

  useEffect(() => {
    loadTasks();
  }, []);

  // 🔥 Load tasks
  const loadTasks = async () => {
    const res = await getTasks();

    const grouped = {
      Pending: [],
      "In Progress": [],
      Done: [],
    };

    res.data.forEach((t) => {
      if (grouped[t.status]) {
        grouped[t.status].push(t);
      }
    });

    setTasks(grouped);
  };

  // 🔥 Drag logic
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) return;

    const sourceCol = [...tasks[source.droppableId]];
    const destCol = [...tasks[destination.droppableId]];

    const [movedTask] = sourceCol.splice(source.index, 1);

    movedTask.status = destination.droppableId;

    destCol.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });

    // 🔥 Backend update
    await updateTask(movedTask.id, {
      title: movedTask.title,
      status: movedTask.status,
      projectId: movedTask.projectId,
      userId: movedTask.userId,
    });
  };

  return (
    <div>
      <h2>Kanban Board</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {Object.keys(tasks).map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: "30%",
                    minHeight: "400px",
                    padding: "10px",
                    borderRadius: "10px",
                    ...columnStyles[col], // 🎨 color added
                  }}
                >
                  <h3>{col}</h3>

                  {tasks[col].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          {/* 🎨 STEP 2: Card UI */}
                          <div
                            style={{
                              padding: "10px",
                              margin: "10px 0",
                              background: "#f5f5f5",
                              borderRadius: "10px",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                              transition: "0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = "scale(1.03)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          >
                            <b>{task.title}</b>

                            <div style={{ fontSize: "12px", marginTop: "5px" }}>
                              📁 {task.project?.name}
                            </div>

                            <div style={{ fontSize: "12px" }}>
                              👤 {task.user?.name}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;