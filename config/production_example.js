// RENAME THIS FILE TO production.js
module.exports = {
    // used in views/overview.vue
    stream_data_one: 'http://<REPLACE WITH YOUR HOSTNAME>:3000/live/streams/one/480p.m3u8',
    stream_data_two: 'http://<REPLACE WITH YOUR HOSTNAME>:3000/live/streams/two/480p.m3u8',
    socket_io_addr: 'http://<REPLACE WITH YOUR HOSTNAME>:3001',
    fileserver_base_url: 'http://<REPLACE WITH YOUR HOSTNAME>:3000'
};
