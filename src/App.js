import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signin from './pages/Signup/Signin';
import Registration from './pages/Registrtion/Registration';
import SendEmail from './pages/SendEmail/SendEmail';

function App() {
  return (
    <div className="App">
    
        <Routes>
          <Route path='/home' element={<Signin />}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/sendEmail' element={<SendEmail/>}/>
          <Route path='/registercompleted' element={<SendEmail/>} />
          
        </Routes>
      
    </div>
  );
}

export default App;