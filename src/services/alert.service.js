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

instance.getAlerts = async function (params) {
    try {
        const resp = await this.post('/get_alerts_postgres', { ...params });
        console.log("SERVICE", resp)
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

instance.updateAlert = async function (event) {
    try {
        const resp = await this.post('/update_alert_postgres', { event });
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

export default instance;