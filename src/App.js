import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import ManagePassword from './pages/ManagePassword';
import MyAccount from './pages/MyAccount';
import Login from './pages/Login';
import React, { createContext, useState, useRef, useEffect } from 'react';
import ForgetPassword from './pages/ForgetPassword';
import CreateNewAccount from './pages/CreateNewAccount';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EditPassword from './pages/EditPassword';
import CreateNewPassword from './pages/CreateNewPassword';
import { refreshSession } from './apis/UserApi';
import CustomDialog from './components/CustomDialog';
import axios from './utils/axiosInstance';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const LoginContext = createContext();

function App() {

  const [isLogin, setIsLogin] = useState(window.sessionStorage.getItem('userId') ? true : false);
  const [openDialog, setOpenDialog] = useState(false)
  const refreshToken = useRef('')
  const navigate = useNavigate()
  const diff = 1000 * 60 * 1

  useEffect(() => {

    if (isLogin) {
      window.lastMove = new Date().getTime();
      document.onmousemove = () => {
        window.lastMove = new Date().getTime();
      }

      const autoRefreshToken = setInterval(() => {
        if (!openDialog) {
          refreshToken();
        }
      }, 1000 * 60 * 10);

      const timeOut = setInterval(() => {
        let now = new Date().getTime();
        if ((now - window.lastMove) > diff && isLogin) {
          setOpenDialog(true)
          clearInterval(timeOut);
          clearInterval(autoRefreshToken);
        }
      }, 1000);
    }

  }, [isLogin, openDialog, refreshToken])

  const handleClickLogout = () => {
    delete axios.defaults.headers.common["Authorization"]
    setIsLogin(false)
    navigate('/')
    setOpenDialog(false)
  }

  const handleClickRefresh = () => {
    const params = {} // dummy params

    refreshSession(params, navigate, refreshToken, setIsLogin)
    setOpenDialog(false)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LoginContext.Provider value={{ isLogin: isLogin, setIsLogin: setIsLogin, refreshToken: refreshToken }}>
        {isLogin ? <NavBar /> : null}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/landing" element={<Landing handleClickRefresh={handleClickRefresh} />} />
          <Route exact path="/managepassword" element={<ManagePassword />} />
          <Route exact path="/myaccount" element={<MyAccount />} />
          <Route exact path="/forgotpassword" element={<ForgetPassword />} />
          <Route exact path="/createnewaccount" element={<CreateNewAccount />} />
          <Route exact path="/createnewpassword" element={<CreateNewPassword />} />
          <Route exact path="/editpassword" element={<EditPassword />} />
        </Routes>
        <CustomDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title='Timeout'
          content='Click refresh to stay logged in'
          rightLabel='Refresh'
          rightAction={handleClickRefresh}
          leftLabel='Logout'
          leftAction={handleClickLogout}
        />
      </LoginContext.Provider>
    </ThemeProvider >
  );
}

export default App;
