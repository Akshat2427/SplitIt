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

function App() {
  const data = useContext(FirebaseContext);
  console.log("Name : ", data.name);

  return (
    <>
     
      <HeroSection id="main" />
      <Services />
     
    </>
  );
}

export default App;