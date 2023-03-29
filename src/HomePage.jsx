import React from 'react';
import './HomePage.css'

function HomePage() {

    const randCont = () => {
        const length = Math.floor(Math.random() * 501) + 500;
        const characters = 'abcdefghijklmnopqrstuvwxyz       ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    return (
        <div className="main">
            <div>
                {randCont()}
            </div>
            <div>
                {randCont()}
            </div>
            <div>
                {randCont()}
            </div>
            <div>
                {randCont()}
            </div>
            <div>
                {randCont()}
            </div>
            <div>
                {randCont()}
            </div>
            <div>
                {randCont()}
            </div>
        </div>
    );
}

export default HomePage;