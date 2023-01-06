import _axios from "axios"

const axios = (baseURL) => {
    //建立一個自定義的axios
    const instance = _axios.create({
        baseURL: baseURL || 'http://localhost:8081', //JSON-Server端口位置
        timeout: 1000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return instance;
}

export default axios();