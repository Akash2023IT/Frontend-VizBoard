import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="welcome-section">
                <h1 className="welcome-heading">Welcome Back</h1>
                <p className="welcome-subheading">Login to access your projects</p>
            </div>
            <div className="auth-form glass-effect">
                <h2>Login</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
