import React from 'react';
import './About.css';
import taskManagementImg from '../images/k-img1.jpg';
import featuresImg from '../images/SpicaBlog_Kanban_board.jpg';

const About = () => {
    return (
        <div id="about-section" className="about-section">
            <div className="about-content">
                <div className="content-box">
                    <div className="image-container">
                        <img 
                            src={taskManagementImg} 
                            alt="Task Management System" 
                            className="section-image"
                        />
                    </div>
                    <h1>About Us</h1>
                    <p className="about-description">
                        Welcome to our Task Management System, your ultimate solution for organizing and streamlining your work process. 
                        We are dedicated to helping you manage your tasks efficiently and effectively. Our platform is designed with 
                        the modern professional in mind, combining powerful functionality with intuitive design. Whether you're a solo 
                        entrepreneur, part of a growing team, or managing multiple projects, our system adapts to your needs and helps 
                        you stay on top of your tasks and deadlines.
                    </p>
                </div>

                <div className="content-box">
                    <div className="image-container">
                        <img 
                            src={featuresImg} 
                            alt="Key Features" 
                            className="section-image"
                        />
                    </div>
                    <h2>Key Features</h2>
                    <div className="features-list">
                        <p>Simple and intuitive task management with drag-and-drop functionality</p>
                        <p>Secure user authentication and data protection protocols</p>
                        <p>Real-time updates and collaborative workspace features</p>
                        <p>Responsive design that works seamlessly across all devices</p>
                        <p>Customizable workflows and task categorization</p>
                        <p>Comprehensive progress tracking and reporting tools</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
