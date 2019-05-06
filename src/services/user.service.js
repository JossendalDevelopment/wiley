// import config from 'config';
import axios from 'axios';
// import { authHeader } from '../helpers';

function login(employeeId, password) {
    return axios.post('http://localhost:3001/login', {eid: employeeId, password:password})
        .then(user => {
            // login successful if there's a jwt token in the response
            console.log("USER.SERVICE", user)
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data.token));
            }

            return user;
        })
        .catch(err => {
            return err
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

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

export const userService = {
    login,
    logout,
    // getAll
};