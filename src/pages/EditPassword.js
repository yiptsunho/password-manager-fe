import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { editPassword } from '../apis/PasswordApi';
import PasswordForm from '../components/PasswordForm';

function EditPassword(props) {
    // id, appName, loginId, password, category
    // const { data, setPasswords } = props;
    const location = useLocation();
    const data = location.data;
    const userId = window.sessionStorage.getItem('userId')

    const handleSubmitEdit = (passwordProfile) => {
        const { id, appName, loginId, password, category } = passwordProfile;

        // editPassword(
        //     {
        //         payload: {
        //             id: id,
        //             appName: appName,
        //             loginId: loginId,
        //             password: password,
        //             category: category,
        //             userId: window.sessionStorage.getItem('userid')
        //         },
        //         setPasswords: setPasswords
        //     })
        console.log(`Editing password to appName = ${appName}, loginId = ${loginId}, password = ${password}, category = ${category},`)
    }

    return (
        <PasswordForm
            data={data}
            handleSubmit={handleSubmitEdit}
        />
    )
}

export default EditPassword;