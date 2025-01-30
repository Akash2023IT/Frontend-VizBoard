import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-section">
            <div className="contact-welcome">
                <h1 className="contact-heading">Contact Us</h1>
                <p className="contact-subheading">We're here to help and answer any questions you might have</p>
            </div>

            <div className="contact-grid">
                <div className="contact-card">
                    <h2>Email Support</h2>
                    <p>Need detailed assistance? Send us an email and we'll get back to you within 24 hours.</p>
                    <a href="mailto:support@vizboard.com" className="contact-link">
                        support@vizboard.com
                    </a>
                </div>

                <div className="contact-card">
                    <h2>Phone Support</h2>
                    <p>For immediate assistance, reach out to our support team directly by phone.</p>
                    <a href="tel:+1234567890" className="contact-link">
                        +1 234 567 890
                    </a>
                </div>

                <div className="contact-card">
                    <h2>Live Chat</h2>
                    <p>Get instant help from our support team through our live chat service.</p>
                    <button className="chat-button">Start Chat</button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
