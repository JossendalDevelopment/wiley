// import config from 'config';
import axios from 'axios';

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

instance.createEvent = function(event) {
    console.log("Event service", event)
    return this.post('/create_event', { event })
        .then(resp => {
            console.log("event service create event", resp)
            return resp.data;
        })
        .catch(err => {
            return err;
        })
};

export default instance;