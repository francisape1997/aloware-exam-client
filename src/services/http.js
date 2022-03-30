import { request } from './request.js';

export default
{
    get: (url, method = 'GET') =>
        request(url, method)
            .then((response) =>
            {
                return response;
            })
            .catch((error) =>
            {
                return error.response;
            }),

    post: (url, data, method = 'POST') =>
        request(url, method, data)
            .then((response) =>
            {
                return response;
            })
            .catch((error) =>
            {
                return error.response;
            }),
};
