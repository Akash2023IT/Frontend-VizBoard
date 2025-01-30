import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './Auth.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(API_ENDPOINTS.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <header className="auth-header">
                <h1>VizBoard</h1>
                <nav>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </header>
            <div className="welcome-section">
                <h1 className="welcome-heading">Welcome to VizBoard</h1>
                <p className="welcome-subheading">Your personalized workflow management tool</p>
            </div>
            <div className="auth-form glass-effect">
                <h2>Sign Up</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSignup}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
