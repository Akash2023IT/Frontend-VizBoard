import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/DashBoard';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import { AuthContext } from './AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { TaskProvider } from './contexts/TaskContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

   
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <ProjectProvider>
                <TaskProvider>
                    <Router>
                        <div className="App">
                            <Routes>
                                
                                <Route path="/" element={<Navigate to="/login" replace />} />
                                
                               
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                
                               
                                <Route
                                    path="/dashboard"
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />
                                
                                
                                <Route path="*" element={<Navigate to="/login" />} />
                            </Routes>
                        </div>
                    </Router>
                </TaskProvider>
            </ProjectProvider>
        </AuthContext.Provider>
    );
}

export default App;
