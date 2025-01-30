import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Header.css';

const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="auth-header">
            <h1>VizBoard</h1>
            <nav>
                <button 
                    onClick={scrollToAbout} 
                    className="nav-link"
                >
                    About
                </button>
                {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
                <Link to="/contact">Contact</Link>
                <Link to="/login">Logout</Link>
            </nav>
        </header>
    );
};

export default Header;
