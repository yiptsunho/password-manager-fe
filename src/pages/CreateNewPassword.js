import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { createNewPassword } from '../apis/PasswordApi';
import PasswordForm from '../components/PasswordForm';

function CreateNewPassword(props) {
    const userId = window.sessionStorage.getItem('userId')
    const { setPasswords } = props;

    const handleSubmitAdd = (passwordProfile) => {
        const { appName, loginId, password, category } = passwordProfile;

        // createNewPassword(
        //     {
        //         payload: {
        //             appName: appName,
        //             loginId: loginId,
        //             password: password,
        //             category: category,
        //             userId: window.sessionStorage.getItem('userid')
        //         },
        //         setPasswords: setPasswords
        //     })
        console.log(`Creating new password with appName = ${appName}, loginId = ${loginId}, password = ${password}, category = ${category},`)
    }

    return (
        <PasswordForm
            handleSubmit={handleSubmitAdd}
        />
    )
}

export default CreateNewPassword;
