import logo from './logo.svg';
import './App.css';
import Navbar from './componets/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componets/Home';
import SignUp from './componets/SignUp';
import SignIn from './componets/SignIn';
import Profile from './componets/Profile';
import Createpost from './componets/Createpost';
import React, { createContext, useState } from 'react';
import { LoginContext } from './context/LoginContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './componets/Modal';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/createPost' element={<Createpost />} />
          </Routes>
          <ToastContainer theme='dark' />
          {modalOpen && <Modal setModalOpen={setModalOpen} />}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
