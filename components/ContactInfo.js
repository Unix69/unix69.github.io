import React from 'react';
import profilePic from '../public/profile.jpg';

function ContactInfo() {
    return (
        <section id="contact_info">
            <h2>Contact Information</h2>
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <p>Email: youremail@example.com</p>
            <p>Phone: +39 123 456 7890</p>
        </section>
    );
}

export default ContactInfo;
