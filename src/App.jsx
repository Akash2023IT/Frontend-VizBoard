import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import { AuthContext } from './AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { TaskProvider } from './contexts/TaskContext';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Clear authentication on component mount
    useEffect(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <ProjectProvider>
                <TaskProvider>
                    <Router>
                        <div className="App">
                            <Routes>
                                <Route path="/signup" element={
                                    <>
                                        <Header />
                                        <Signup />
                                        <About />
                                        <Contact />
                                    </>
                                } />
                                <Route path="/login" element={
                                    <>
                                        <Header />
                                        <Login />
                                        <About />
                                        <Contact />
                                    </>
                                } />
                                <Route path="/dashboard" element={
                                    isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                                } />
                                <Route path="/" element={<Navigate to="/signup" />} />
                                <Route path="*" element={<Navigate to="/signup" />} />
                            </Routes>
                        </div>
                    </Router>
                </TaskProvider>
            </ProjectProvider>
        </AuthContext.Provider>
    );
}

export default App;
