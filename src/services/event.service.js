// import config from 'config';
import axios from 'axios';

const instance = axios.create();
instance.token = window.localStorage.getItem('token') || null;

instance.new = function (url = `/`) {
    this.defaults.baseURL = url;

    if (this.token) {
        this.tokenInterceptor = this.interceptors.request.use(config => {
            config.headers['Authorization'] = 'Bearer ' + this.token;
            return config;
        });
    }
};

instance.createEvent = async function (event) {
    try {
        const resp = await this.post('/create_event', { event });
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

instance.updateEvent = async function (event) {
    try {
        const resp = await this.post('/update_event_postgres', { event });
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

instance.getAllEvents = async function () {
    try {
        const resp = await this.get('/get_all_events_postgres');
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

instance.getFiftyEvents = async function () {
    try {
        const resp = await this.get('/get_fifty_unclassified_events_postgres');
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

instance.getAllClassifiedEvents = async function () {
    try {
        const resp = await this.get('/get_all_classified_events_postgres');
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

instance.setYesterdaysEvents = async function () {
    // take data from metadata.json file, parse it for only unclassified, and return array of events to be set in vuex store
    try {
        const resp = await this.get('/set_yesterdays_events_postgres');
        return resp.data;
    } catch (err) {
        return { status: 500, msg: err };
    }
};

// delete this
// instance.addNewEvents = async function(events) {
//     try {
//         const resp = await this.post('/add_new_events', { events });
//         return resp.data;
//     } catch (err) {
//         return err;
//     }
// };

instance.deleteEvents = async function () {
    try {
        const resp = await this.get('/delete_events');
        return resp.data;
    } catch (err) {
        return err;
    }
};

export default instance;
