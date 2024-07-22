import React, { useContext } from 'react';
import LazyLoad from 'react-lazyload';
import { Buttons } from './Buttons';
import './HeroSection.css';
import { FirebaseContext } from '../context/firebase';
import { Link } from 'react-router-dom';

function HeroSection() {
    const data = useContext(FirebaseContext);
    return (
        <LazyLoad height={200} offset={100}>
            <div className='hero-container' id='main'>
                <h1>Split Expense ? </h1>
                <p>This is your one stop solution...</p>
                <div className="hero-btns">
                    <Buttons className="btns" buttonStyle={'btn--outline'} buttonSize={'btn--large'}>
                        <Link to="split-expense" className='q-split' style={{ textDecoration: "none", color: "white" }}>
                            <span className='q-split'>Quick Split</span> {console.log("res", data.loggedIn)}
                        </Link>
                    </Buttons>
                    <Buttons className="btns" buttonStyle={'btn--primary'} buttonSize={'btn--large'}>
                        {data?.loggedIn == false ? <>{" Sign Up "}<i className="fas fa-sign-in-alt"></i></> : `Hi , ${data?.user?.displayName || "User"}`}
                    </Buttons>
                </div>
            </div>
        </LazyLoad>
    );
}

export default HeroSection;