import axios from '../utils/axiosInstance';
import * as ApiConst from '../utils/ApiConst'
import { Navigate } from 'react-router-dom';

export async function getAllPasswords(params, setState) {
    let responseData = null;

    try {
        responseData = await axios.get(ApiConst.PASSWORD_PROFILE_API, { params: params });
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        setState(responseData.data)

    }

}

export async function createNewPassword(params) {
    let responseData = null;
    const { payload, setPasswords } = params;

    try {
        responseData = await axios.post(ApiConst.PASSWORD_PROFILE_API, payload);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        // do sth
    }

}

export async function editPassword(params) {
    let responseData = null;
    const { payload, setPasswords } = params;

    try {
        responseData = await axios.put(ApiConst.PASSWORD_PROFILE_API, payload);
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        // do sth
    }

}

export async function deletePassword(params) {
    let responseData = null;
    const { payload, setPasswords } = params;

    try {
        responseData = await axios.delete(ApiConst.PASSWORD_PROFILE_API, { params: payload });
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        // do sth
    }

}

