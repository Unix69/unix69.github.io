import React from 'react';
import ContactInfo from './components/ContactInfo';

function WebPageHeader() {
    return (
        <header>
            <h1>Welcome to My Home Page</h1>
            <ContactInfo />
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#programming_courses">Programming Courses</a></li>
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#publications">Publications</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#references">References</a></li>
                    <li><a href="#repositories">Repositories</a></li>
                    <li><a href="#about_me">About Me</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default WebPageHeader;
