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

instance.createEvent = async function(event) {
    try {
        const resp = await this.post('/create_event', { event });
        return resp.data;
    } catch (err) {
        return err;
    }
};

instance.updateEvent = async function(event) {
    try {
        const resp = await this.post('/update_event', { event });
        return resp.data;
    } catch (err) {
        return err;
    }
};

instance.getAllEvents = async function() {
    try {
        const resp = await this.get('/get_all_events');
        return resp.data;
    } catch (err) {
        return err;
    }
};

instance.getAllClassifiedEvents = async function() {
    try {
        const resp = await this.get('/get_all_classified_events');
        return resp.data;
    } catch (err) {
        return err;
    }
};

instance.getYesterdaysEvents = async function() {
    // remove this?
    try {
        const resp = await this.get(
            'http://localhost:3000/mnt/sol2_video/inferenced/2019/06/28/c1.jpg'
        );
        console.log('GET_YESTERDAYS', resp);
        return resp.data;
    } catch (err) {
        return err;
    }
};

instance.addNewEvents = async function(events) {
    try {
        const resp = await this.post('/add_new_events', { events });
        return resp.data;
    } catch (err) {
        return err;
    }
};

instance.deleteEvents = async function(events) {
    try {
        const resp = await this.post('/delete_events', { events });
        return resp.data;
    } catch (err) {
        return err;
    }
};

export default instance;
