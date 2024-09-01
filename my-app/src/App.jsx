import React from 'react'
import Home from "./Home"
import { Routes , Route } from 'react-router-dom'
import SignUp from './pages/sign-up'
import NavBar from './components/NavBar'
import SplitExpense from './pages/SplitExpense'
import ContactUs from './pages/Contact'
// import FullSplitExpense from './pages/FullSplitExpense'
import PrevRooms from './pages/PrevRooms'
import {EditRoom, FullSplitExpense} from './pages'
import PageNotFound from './pages/PageNotFound';
function App() {
  return (
   <>
  
   
   <Routes>
    < Route path="/" element={<Home></Home>} />
    < Route path="/rooms" element={<PrevRooms></PrevRooms>} />
    < Route path="/sign-up" element={<SignUp></SignUp>} />
    < Route path="/split-expense" element={<SplitExpense></SplitExpense>} />
    < Route path="/split-expense-full" element={<FullSplitExpense></FullSplitExpense>} />
    < Route path="/edit-room/:id" element={<EditRoom></EditRoom>} />
    < Route path="/comming-soon" element={<PageNotFound></PageNotFound>} />
   </Routes>
   <ContactUs/>
   </>
  )
}

export default App
