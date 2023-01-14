import axios from '../utils/axiosInstance';
import * as ApiConst from '../utils/ApiConst'

export async function login(params, setState, navigate, setOpenDialog) {
    let responseData = null;

    try {
        responseData = await axios.post(ApiConst.LOGIN, params);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        setState(true)
        window.sessionStorage.setItem('userId', responseData.data.id)
        window.sessionStorage.setItem('displayName', responseData.data.displayName)
        navigate('/landing')
    } else {
        setOpenDialog(true)
    }

}

export async function createNewAccount(params, setOpenDialog, dialogTitle, dialogContent, dialogRightAction, navigate) {
    let responseData = null;

    try {
        responseData = await axios.post(ApiConst.CREATE_NEW_ACCOUNT, params);
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
        responseData = await axios.put(ApiConst.EDIT_ACCOUNT, params);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        navigate('/landing')
    } else {
        setOpenDialog(true)
    }

}