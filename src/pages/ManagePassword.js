import React, { createContext, useEffect, useState } from 'react';
import PasswordTable from './PasswordTable';
import { getAllPasswords } from '../apis/PasswordApi';

export const PasswordContext = createContext();

function ManagePassword() {

    const [passwords, setPasswords] = useState([])

    useEffect(() => {
        getAllPasswords({ userId: window.sessionStorage.getItem('userId') }, setPasswords)
    }, [])

    return (
        <PasswordContext.Provider value={{ passwords: passwords, setPasswords: setPasswords }}>
            {/* <div className="App-header dark">
                <div> */}
            <h1>This is the manage password page</h1>
            <PasswordTable
                passwords={passwords}
            />
            {/* </div>
            </div> */}
        </PasswordContext.Provider>
    )
}

export default ManagePassword;