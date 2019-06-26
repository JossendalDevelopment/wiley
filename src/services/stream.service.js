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
        });
    }
};

instance.startStream = function() {
    return this.get('/start_video_stream').then(resp => {
        console.log('READSTREAM RESPONSE', resp);
        return resp;
    });
};

export default instance;
