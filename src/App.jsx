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

    // Check for existing token on mount instead of clearing it
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
                                {/* Redirect root to login instead of signup */}
                                <Route path="/" element={<Navigate to="/login" replace />} />
                                
                                {/* Public routes */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                
                                {/* Protected route */}
                                <Route
                                    path="/dashboard"
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />
                                
                                {/* Catch all route - redirect to login */}
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
