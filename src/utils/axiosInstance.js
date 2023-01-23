import _axios from "axios";

const getToken = () => {

    return (window.localStorage.getItem('token'))
}

const axios = (baseURL) => {
    //建立一個自定義的axios
    const instance = _axios.create({
        //JSON-Server端口位置
        timeout: 1000,
        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return instance;
}

export default axios();