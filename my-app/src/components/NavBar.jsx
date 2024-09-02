import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Buttons } from './Buttons';
import "./NavBar.css";
import { FirebaseContext } from '../context/firebase';
import { useEffect } from 'react';
function NavBar() {
  const data = useContext(FirebaseContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  function closeMobileMenu() {
    setClick(false);
  }

  const showBtn = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showBtn();
    window.addEventListener('resize', showBtn);
    return () => window.removeEventListener('resize', showBtn);
  }, []);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          SplitIt <i className='fab fa-typo3'></i>
        </Link>
        <div className="menu-icon" onClick={() => setClick(!click)}>
          <i className={click ? "fas fa-times" : "fa fa-bars"}></i>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <a href={location.pathname === "/" ? "#main" : "/"} className="nav-links" onClick={closeMobileMenu}>
              Home
            </a>
          </li>
          <li className='nav-item'>
            <a href={location.pathname === "/" ? "#quickSplit" : "/"} className="nav-links" onClick={closeMobileMenu}>
              Quick Split
            </a>
          </li>
         
          <li className='nav-item'>
            <a href={location.pathname === "/" ? "#splitExpense" : "/"} className="nav-links" onClick={closeMobileMenu}>
              Split Expense
            </a>
          </li>
          <li className='nav-item'>
            <a href={location.pathname === "/" ? "/sign-up" : "/"} id='sgn-up' className="nav-links" onClick={closeMobileMenu}>
              Sign Up
            </a>
          </li>
        </ul>
        {button && 
        data.user ? 
        (
          <div className="navbar-user">
            <img 
              src={data?.user?.photoURL || "Group.jpg"} 
              alt="User Avatar" 
              className="user-avatar" 
              onClick={toggleDropdown} 
              style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                cursor: 'pointer' 
              }} 
            />
            {dropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={data.signOutUser} >
                  Logout
                </button>
              </div>
            )}
          </div>
        )
      :
      (
        <button  className="dropdown-item" style={{ width: "7.5vw" }}>
        <Link to='/sign-up' className="signup-link"  style={{ textDecoration: 'none', color: 'inherit' }}>
          Sign Up
        </Link>
      </button>
      )
      }
      </div>
    </nav>
  );
}

export default NavBar;
