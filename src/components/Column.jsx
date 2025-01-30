import React, { useState, useRef, useEffect, memo } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./modal.css"; // Import modal CSS
import "./Card.css";

const TaskList = styled.div`
  padding: 10px;
  background: rgba(255, 255, 255, 0.1); /* Reduced opacity */
  backdrop-filter: blur(5px); /* Reduced blur effect */
  border-radius: 10px; /* Rounded corners */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Light border */
  height: 100vh; /* Extend to fill the column */
  position: relative; /* Ensure proper positioning */
  z-index: 1; /* Set z-index for the column */
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ isDragged }) => (isDragged ? "#4CAF50" : "#e1f5fe")};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease;
  z-index: 10; /* Set a higher z-index for dragged items */

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }

  .task-title {
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }

  .task-description {
    font-size: 0.95rem;
    color: #666;
    margin-top: 5px;
  }

  .task-footer {
    margin-top: 10px;
    font-size: 0.85rem;
    color: #777;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .delete-btn {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .priority-high {
    background-color: #ff4d4d;
    color: white;
    padding: 3px 8px;
    border-radius: 3px;
  }

  .priority-medium {
    background-color: #4caf50;
    color: white;
    padding: 3px 8px;
    border-radius: 3px;
  }

  .priority-low {
    background-color: #ffeb3b;
    color: black;
    padding: 3px 8px;
    border-radius: 3px;
  }
`;

const Task = memo(({ task, index, id, onDeleteTask }) => (
  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
    {(draggableProvided, snapshot) => (
      <TaskContainer
        ref={draggableProvided.innerRef}
        {...draggableProvided.draggableProps}
        {...draggableProvided.dragHandleProps}
        isDragged={snapshot.isDragging}
      >
        <div className="task-title">{task.title}</div>
        <div className="task-description">{task.description}</div>
        <div className="task-footer">
          <span className={`priority-${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span>Deadline: {task.deadline}</span>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                onDeleteTask(id, task.id);
              }
            }}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </TaskContainer>
    )}
  </Draggable>
));

export default function Column({ id, title, tasks, onAddTask, onDeleteTask, showAddTaskButton }) {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
  });
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // Focus management and closing modal with Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      modalRef.current?.focus();
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  const handleAddTask = () => {
    if (!taskDetails.title.trim() || !taskDetails.deadline.trim()) {
      setError("Title and deadline are required!");
      return;
    }
    setError("");
    onAddTask(
      id,
      taskDetails.title,
      taskDetails.description,
      taskDetails.priority,
      taskDetails.deadline
    );
    setTaskDetails({
      title: "",
      description: "",
      priority: "medium",
      deadline: "",
    });
    setShowModal(false);
  };

  return (
    <div style={{ width: "250px" }}>
      <h3 style={{ color: '#FFFFFF' }}>{title}</h3> {/* Change color to white */}
      {showAddTaskButton && (
        <button
          onClick={() => setShowModal(true)}
          className="add-task-btn"
        >
          Add Task
        </button>
      )}
      <Droppable droppableId={id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                id={id}
                onDeleteTask={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>

      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="modal-container"
            tabIndex={-1}
            ref={modalRef}
          >
            <h4 id="modal-title" className="modal-header">Add New Task</h4>
            <input
              className="modal-input"
              type="text"
              placeholder="Title"
              value={taskDetails.title}
              onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
            />
            <textarea
              className="modal-input"
              placeholder="Description"
              value={taskDetails.description}
              onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
            />
            <select
              className="modal-select"
              value={taskDetails.priority}
              onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <input
              className="modal-date"
              type="date"
              value={taskDetails.deadline}
              onChange={(e) => setTaskDetails({ ...taskDetails, deadline: e.target.value })}
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-button-container">
              <button className="modal-button" onClick={handleAddTask}>
                Add Task
              </button>
              <button
                className="modal-button modal-button-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
