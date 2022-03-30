import axios from 'axios';

export function request(url, method, data = [])
{
    return axios({
        url: `http://alowaretest.local/api/${url}`, // Your api hostname here
        method,
        data,
    })
}
