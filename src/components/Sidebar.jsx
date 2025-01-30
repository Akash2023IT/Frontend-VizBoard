import React, { useState, useEffect } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const [newProject, setNewProject] = useState('');
    const { 
        projects, 
        currentProject, 
        setCurrentProject, 
        fetchProjects, 
        createProject, 
        deleteProject 
    } = useProjects();

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (newProject.trim()) {
            const project = await createProject(newProject.trim());
            if (project) {
                setNewProject('');
                setCurrentProject(project);
                console.log('Current project set to:', project);
            }
        }
    };

    const handleDeleteProject = async (projectId) => {
        await deleteProject(projectId);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={onClose}>×</button>
            <nav>
                <form onSubmit={handleAddProject} className="project-form">
                    <input
                        type="text"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                        placeholder="New Project Name"
                        className="project-input"
                    />
                    <button type="submit" className="add-project-btn">+</button>
                </form>
                <ul className="project-list">
                    {projects.map((project) => (
                        <li 
                            key={project._id} 
                            className={`project-item ${currentProject?._id === project._id ? 'active' : ''}`}
                        >
                            <span onClick={() => {
                                setCurrentProject(project);
                                console.log('Clicked project:', project);
                            }}>
                                {project.name}
                            </span>
                            <button 
                                className="delete-project-btn"
                                onClick={() => handleDeleteProject(project._id)}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar; 