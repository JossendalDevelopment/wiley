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

instance.createEvent = async function(event) {
    try {
        const resp = await this.post('/create_event', { event });
        console.log("event service created event", resp);
        return resp.data;
    }
    catch (err) {
        return err;
    }
};

instance.updateEvent = async function(event) {
    try {
        const resp = await this.post('/update_event', { event });
        console.log("event service updated event", resp);
        return resp.data;
    }
    catch (err) {
        return err;
    }
};

instance.getAllEvents = async function() {
    try {
        const resp = await this.get('/get_all_events');
        return resp.data;
    }
    catch (err) {
        return err;
    }
};

instance.setNewEvents = async function(events) {
    try {
        const resp = await this.post('/set_new_events', { events });
        return resp.data;
    }
    catch (err) {
        return err;
    }
}

export default instance;