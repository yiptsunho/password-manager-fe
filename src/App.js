import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import ManagePassword from './pages/ManagePassword';
import MyAccount from './pages/MyAccount';
import Login from './pages/Login';
import React, { createContext, useState } from 'react';

async function fetchData(url, params, setState) {
  await fetch(url, params)
    .then(response => response.json())
    .then(data => setState(data));
}

export const PasswordContext = createContext();

function App() {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <PasswordContext.Provider value={{ fetchData: fetchData, setIsLogin: setIsLogin }}>
        {isLogin ? <NavBar /> : null}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/landing" element={<Landing />} />
          <Route exact path="/managepassword" element={<ManagePassword />} />
          <Route exact path="/myaccount" element={<MyAccount />} />
        </Routes>
      </PasswordContext.Provider>
    </Router>
  );
}

export default App;
