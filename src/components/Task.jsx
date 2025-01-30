import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../contexts/TaskContext';
import './Task.css';

const Task = ({ task, index }) => {
    const { deleteTask } = useTasks();

    const handleDelete = async (e) => {
        e.stopPropagation();
        await deleteTask(task._id);
    };

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div 
                    className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="task-header">
                        <span className="task-id">#{task._id.slice(-4)}</span>
                        <button 
                            className="task-delete"
                            onClick={handleDelete}
                        >
                            ×
                        </button>
                    </div>
                    <h3 className="task-title">{task.title}</h3>
                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-footer">
                        <span className={`task-priority ${task.priority}`}>
                            {task.priority}
                        </span>
                        <span className="task-date">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;