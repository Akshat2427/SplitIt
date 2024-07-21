import React, { useState, useEffect, useContext } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { Buttons } from './Buttons';
import "./NavBar.css";
import { FirebaseContext } from '../context/firebase'
function NavBar() {
  const data  = useContext(FirebaseContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
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
console.log("loaction" , location.pathname);
  return (
    <nav className="navbar" style={{marginTop:"0px"}}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          SplitIt <i className='fab fa-typo3'></i>
        </Link>
        <div className="menu-icon" onClick={() => setClick(!click)}>
          <i className={click ? "fas fa-times" : "fa fa-bars"}></i>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <a href={location.pathname === "/" ? "#main" : "/"} className="nav-links" onClick={closeMobileMenu} >
              Home
            </a>
          </li>
          <li className='nav-item'>
            <a href={location.pathname === "/" ? "#services" : "/"} className="nav-links" onClick={closeMobileMenu}>
              Services
            </a>
          </li>
          <li className='nav-item'>
            {console.log("navbar" , data.loggedIn)}
            {data.loggedIn ? <><Link to="/" className="nav-links-mobile" onClick={data.signOutUser}>
             Logout
            </Link></> : <><Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
              Signup
            </Link></>}
          </li>
        </ul>
        {button && <Buttons buttonStyle={'btn--primary'} buttonSize={'btn--large'} onClick={data.signOutUser}>{data.loggedIn ? "Log Out" : "Sign In"}</Buttons>}
      </div>
    </nav>
  );
}

export default NavBar;