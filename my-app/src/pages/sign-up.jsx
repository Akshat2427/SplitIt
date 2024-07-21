import React, { useState, useContext , useEffect } from 'react';
import './sign-up.css';
import { FirebaseContext } from '../context/firebase';
import {useNavigate} from "react-router-dom"
const SignUpForm = ({ signUpUser, setUserName, setEmail, setPassword }) => (
  <form className="signup-form" onSubmit={signUpUser}>
    <h2>Sign Up</h2>
    <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} required />
    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
    <button type="submit">Sign Up</button>
  </form>
);

const SignInForm = ({ signInUser, setEmail, setPassword }) => (
  <form className="signin-form" onSubmit={signInUser}>
    <h2>Sign In</h2>
    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
    <button type="submit">Sign In</button>
  </form>
);

const SignUp = () => {
  const data = useContext(FirebaseContext);
  const [isSignupActive, setIsSignupActive] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
   if(data.loggedIn){
    console.log("loggedIn" , data.user);
navigate("/")
   }
  },[data, navigate])
  const handleToggle = () => {
    setIsSignupActive(!isSignupActive);
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
    const res =   await data.signUpUserWithEmail(email, password);
    console.log("signup-res : ", res);
    } catch (error) {
      console.log("error while signup", error);
      if (error.code === 'auth/email-already-in-use') {
        
        try {
          const res =  await data.signInUserWithEmail(email, password);
          console.log("signin-res : ", res);
         } catch (error) {
           console.log("error while sign in", error.code);
           if(error.code === "auth/invalid-credential")
             alert("The email address is already in use by another account but the password is wrong");
         }
      }
      if(error.code === 'auth/weak-password')
        alert("Weak password , it should be of atleat 6 characters");
    }
  };

  const signInUser = async (e) => {
    e.preventDefault();
    try {
     const res =  await data.signInUserWithEmail(email, password);
     console.log("signin-res : ", res);
    } catch (error) {
      console.log("error while sign in", error.code);
      if(error.code === "auth/invalid-credential")
        alert("invalid creadentials");
    }
  };

  return (
    <div className="form-container">
      <button className="google-button" onClick={data.signInWithGoogle}>Sign in with Google</button>
      <div className="button-container">
        <button
          className={`toggle-button ${isSignupActive ? 'active' : ''}`}
          onClick={handleToggle}
        >
          Sign Up
        </button>
        <button
          className={`toggle-button ${!isSignupActive ? 'active' : ''}`}
          onClick={handleToggle}
        >
          Sign In
        </button>
      </div>
      {isSignupActive ? (
        <SignUpForm
          signUpUser={signUpUser}
          setUserName={setUserName}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      ) : (
        <SignInForm
          signInUser={signInUser}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default SignUp;