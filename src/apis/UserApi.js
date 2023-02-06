import axios from '../utils/axiosInstance';
import * as ApiConst from '../utils/ApiConst'

export async function login(params, setState, navigate, setOpenDialog, refreshToken) {
    let responseData = null;

    try {
        responseData = await axios.post(ApiConst.LOGIN, params);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        setState(true)
        window.sessionStorage.setItem('userId', responseData.data.userId)
        window.sessionStorage.setItem('displayName', responseData.data.displayName)
        axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.data.accessToken}`;
        refreshToken.current = responseData.data.refreshToken
        navigate('/landing')
    } else {
        setOpenDialog(true)
    }

}

export async function refreshSession(params, navigate, refreshToken, setIsLogin, clearPreviousRefreshCountdown) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken.current}`;
    let responseData = null;

    try {
        responseData = await axios.post(ApiConst.REFRESH_SESSION, params);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.data.accessToken}`;
        refreshToken.current = responseData.data.refreshToken
        // window.location.reload(false)
    } else {
        delete axios.defaults.headers.common["Authorization"]
        window.sessionStorage.clear()
        navigate('/')
        setIsLogin(false)
        clearPreviousRefreshCountdown()
    }

}

export async function createNewAccount(params, setOpenDialog, dialogTitle, dialogContent, dialogRightAction, navigate) {
    let responseData = null;

    try {
        responseData = await axios.post(ApiConst.USER_API, params);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        dialogTitle.current = responseData.status
        dialogContent.current = responseData.message
        dialogRightAction.current = navigate('/landing')
        setOpenDialog(true)
    } else {
        dialogTitle.current = responseData.status
        dialogContent.current = responseData.message
        dialogRightAction.current = ''
        setOpenDialog(true)
    }

}

export async function editAccount(params, setState, navigate, setOpenDialog) {
    let responseData = null;

    try {
        responseData = await axios.put(ApiConst.USER_API, params);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        navigate('/landing')
    } else {
        setOpenDialog(true)
    }

}