import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import './HeroSection.css';

function HeroSection() {
    const data = useContext(FirebaseContext);
    return (
        <div className='hero-container' id='main'>
            <h1 style={{ textAlign: "center" }}>In hurry ?</h1>
            <p style={{ textAlign: "center" }}>Use our Quick Split</p>
            <div className="hero-btns">
                <div className="card">
                    <Link to="split-expense" className='q-split' style={{ textDecoration: "none", color: "black" }}>
                        <span className='q-split'>Quick Split</span>
                    </Link>
                </div>
                <div className="card">
                    {data?.loggedIn === false ? (
                        <>
                            {" Sign Up "}
                            <i className="fas fa-sign-in-alt"></i>
                        </>
                    ) : (
                        `Hi, ${data?.user?.displayName || "User"}`
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeroSection;