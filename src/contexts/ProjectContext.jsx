import React, { createContext, useState, useContext } from 'react';
import { API_ENDPOINTS } from '../config/api';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);

    const fetchProjects = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.PROJECTS, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const createProject = async (name) => {
        try {
            const response = await fetch(API_ENDPOINTS.PROJECTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name })
            });
            
            const data = await response.json();
            if (response.ok) {
                setProjects([...projects, data]);
                return data;
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const deleteProject = async (projectId) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.PROJECTS}/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setProjects(projects.filter(p => p._id !== projectId));
                if (currentProject?._id === projectId) {
                    setCurrentProject(null);
                }
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <ProjectContext.Provider value={{
            projects,
            currentProject,
            setCurrentProject,
            fetchProjects,
            createProject,
            deleteProject
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext); 