import axios from 'axios';

const instance = axios.create();
instance.token = window.localStorage.getItem('token') || null;

instance.new = function (url = '/') {
    this.defaults.baseURL = url;

    if (this.token) {
        this.tokenInterceptor = this.interceptors.request.use(config => {
            config.headers['Authorization'] = 'Bearer ' + this.token;
            return config;
        })
    }
};

instance.login = function (employeeEmail, password) {
    return this.post('/login', { employeeEmail: employeeEmail, password: password })
        .then(resp => {
            const user = resp.data
            // login successful if there's a jwt token in the response
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                window.localStorage.setItem('user', JSON.stringify(user.data));
                window.localStorage.setItem('token', user.data.token)
                this.tokenInterceptor = this.interceptors.request.use(config => {
                    config.headers['Authorization'] = 'Bearer ' + user.data.token;
                    return config;
                })
            }

            return resp.data;
        })
        .catch(err => {
            return err;
        })
};

instance.logout = function () {
    this.token = null;
    this.interceptors.request.eject(this.tokenInterceptor);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
};

export default instance;