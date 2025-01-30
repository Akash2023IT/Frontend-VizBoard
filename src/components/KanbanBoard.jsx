import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useProjects } from '../contexts/ProjectContext';
import { useTasks } from '../contexts/TaskContext';
import Task from './Task';
import Modal from './Modal';
import './KanbanBoard.css';

const KanbanBoard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currentProject } = useProjects();
    const { tasks, fetchTasks, createTask, updateTask } = useTasks();

    useEffect(() => {
        if (currentProject?._id) {
            fetchTasks(currentProject._id);
        }
    }, [currentProject]);

    const columns = {
        todo: {
            title: 'To Do',
            items: tasks.filter(task => task.status === 'todo')
        },
        inProgress: {
            title: 'In Progress',
            items: tasks.filter(task => task.status === 'inProgress')
        },
        done: {
            title: 'Done',
            items: tasks.filter(task => task.status === 'done')
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;
        if (source.droppableId === destination.droppableId) return;

        const newStatus = destination.droppableId;
        await updateTask(draggableId, { status: newStatus });
    };

    const handleCreateTask = async (taskData) => {
        if (!currentProject) return;
        
        await createTask({
            ...taskData,
            projectId: currentProject._id,
            status: 'todo'
        });
        setIsModalOpen(false);
    };

    if (!currentProject) {
        return (
            <div className="no-project-message">
                Select or create a project to view tasks
            </div>
        );
    }

    return (
        <div className="kanban-container">
            <div className="kanban-header">
                <h2>{currentProject.name}</h2>
                <button 
                    className="add-task-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Task
                </button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="kanban-board">
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div key={columnId} className="kanban-column">
                            <h3>{column.title}</h3>
                            <Droppable droppableId={columnId}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="task-list"
                                    >
                                        {column.items.map((task, index) => (
                                            <Task 
                                                key={task._id}
                                                task={task}
                                                index={index}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateTask}
            />
        </div>
    );
};

export default KanbanBoard;