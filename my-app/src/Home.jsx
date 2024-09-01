import React, { useContext } from 'react';
import NavBar from "./components/NavBar";
import HeroSection from './components/HeroSection';
import SignUp from "./pages/sign-up";
import "./App.css";
import { FirebaseContext } from './context/firebase';
import { Route, Routes } from 'react-router-dom';
import SplitExpense from './pages/SplitExpense';
import CardService from './components/CardService';
import Services from './pages/Services';
import ParallyxHome from './components/ParallyxHome';
import SideText from './components/SideText';
import RightSideText from './components/RightSideText';
function App() {
  const data = useContext(FirebaseContext);
  console.log("Name : ", data.name);

  return (
    <>
      <NavBar  />
      <ParallyxHome/>
      <SideText></SideText>
      <RightSideText></RightSideText>
      {/* <HeroSection id="main" /> */}
      {/* <Services /> */}
    
    </>
  );
}

export default App;