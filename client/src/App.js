//import logo from './logo.svg';
import './App.css';

import React from "react";

import { Route, Routes } from "react-router-dom";
 
// Import views
import Navigation from "./views/Navigation";
import About from "./views/About";
import Dashboard from "./views/Dashboard";
import UserSettings from './views/UserSettings';
import Appearance from './views/Appearance';
import Privacy from './views/Privacy';
import SignOut from './views/SignOut';
 
const App = () => {
 return (
  <>
   <Navigation />
   <div className='appWrapper'>
     <Routes>
       <Route exact path="/" element={<Dashboard />} />
       <Route path="/about" element={<About />} />
       <Route path="/user-settings" element={<UserSettings />} />
       <Route path="/appearance" element={<Appearance />} />
       <Route path="/privacy-and-data" element={<Privacy />} />
       <Route path="/sign-out" element={<SignOut />} />
     </Routes>
   </div>
   </>
 );
};
 
export default App;