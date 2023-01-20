import axios from '../utils/axiosInstance';
import * as ApiConst from '../utils/ApiConst'
import { Navigate } from 'react-router-dom';

export async function getAllPasswords(params, setState) {
    let responseData = null;

    try {
        responseData = await axios.get(ApiConst.GET_ALL_PASSWORD, { params: params });
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
        responseData = await axios.post(ApiConst.CREATE_NEW_PASSWORD, payload);
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
        responseData = await axios.put(ApiConst.EDIT_PASSWORD, payload);
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
        responseData = await axios.delete(ApiConst.DELETE_PASSWORD, { params: payload });
    } catch (ex) {
        console.error(ex);
    }

    if (responseData && responseData.status === 200) {
        // do sth
    }

}

