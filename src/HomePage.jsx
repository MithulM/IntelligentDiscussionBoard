import { useState } from 'react';
import './App.css'
import './HomePage.css'

function HomePage() {
    return (
        <div className="App">
            <div className="menu">
                <ul>
                    <li>Menu item 1</li>
                    <li>Menu item 2</li>
                    <li>Menu item 3</li>
                </ul>
            </div>
            <div className="main">
                <div className="content">
                    {/* Main content goes here */}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
