import React, { useState } from "react";
import './Dashboard.css';
import Sidebar from './Sidebar';
import KanbanBoard from './KanbanBoard';
import { useProjects } from '../contexts/ProjectContext';

const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { currentProject } = useProjects();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <button className="menu-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                    ☰ Menu
                </button>
                <h1>{currentProject?.name || 'Select a Project'}</h1>
            </div>
            
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setSidebarOpen(false)}
            />
            
            <div className="dashboard-content">
                <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <KanbanBoard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
