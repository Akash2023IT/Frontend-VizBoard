import React, { createContext, useState, useContext } from 'react';
import { API_ENDPOINTS } from '../config/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async (projectId) => {
        if (!projectId) return;
        try {
            const response = await fetch(`${API_ENDPOINTS.TASKS}/project/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createTask = async (taskData) => {
        try {
            const response = await fetch(API_ENDPOINTS.TASKS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(taskData)
            });
            
            const data = await response.json();
            if (response.ok) {
                setTasks([...tasks, data]);
                return data;
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const updateTask = async (taskId, updates) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.TASKS}/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updates)
            });
            if (response.ok) {
                const updatedTask = await response.json();
                setTasks(tasks.map(task => 
                    task._id === taskId ? updatedTask : task
                ));
                return updatedTask;
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.TASKS}/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== taskId));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            fetchTasks,
            createTask,
            updateTask,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext); 