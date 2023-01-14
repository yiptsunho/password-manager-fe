import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import ManagePassword from './pages/ManagePassword';
import MyAccount from './pages/MyAccount';
import Login from './pages/Login';
import React, { createContext, useState } from 'react';
import ForgetPassword from './pages/ForgetPassword';
import CreateNewAccount from './pages/CreateNewAccount';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const LoginContext = createContext();

function App() {

  const [isLogin, setIsLogin] = useState(window.sessionStorage.getItem('userId') ? true : false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <LoginContext.Provider value={{ isLogin: isLogin, setIsLogin: setIsLogin }}>
          {isLogin ? <NavBar /> : null}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/landing" element={<Landing />} />
            <Route exact path="/managepassword" element={<ManagePassword />} />
            <Route exact path="/myaccount" element={<MyAccount />} />
            <Route exact path="/forgotpassword" element={<ForgetPassword />} />
            <Route exact path="/createnewaccount" element={<CreateNewAccount />} />
          </Routes>
        </LoginContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
