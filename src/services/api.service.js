// import config from 'config';
import axios from 'axios';
// import { authHeader } from '../helpers';

const instance = axios.create();
instance.token = window.localStorage.getItem('token') || null;

instance.new = function(url = '/') {
    this.defaults.baseURL = url;

    if (this.token) {
        this.tokenInterceptor = this.interceptors.request.use(config => {
            config.headers['Authorization'] = 'Bearer ' + this.token;
            return config;
        })
    }
};

instance.login = function(employeeId, password) {
    return this.post('/login', {eid: employeeId, password:password})
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                window.localStorage.setItem('user', JSON.stringify(user.data));
                window.localStorage.setItem('token', user.data.token)
                this.tokenInterceptor = this.interceptors.request.use(config => {
                    config.headers['Authorization'] = 'Bearer ' + user.data.token
                    return config
                })
            }

            return user;
        })
        .catch(err => {
            return err
        })
};

instance.logout = function() {
    // remove user from local storage to log user out
    this.token = null;
    this.interceptors.request.eject(this.tokenInterceptor);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
};

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }

export default instance;
// export const userService = {
//     login,
//     logout,
//     // getAll
// };