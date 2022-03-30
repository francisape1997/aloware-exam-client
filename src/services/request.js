import axios from 'axios';

export function request(url, method, data = [])
{
    const API_URL = 'http://alowaretest.local/api'

    return axios({
        url: `${API_URL}/${url}`, // Your api hostname here
        method,
        data,
    })
}
