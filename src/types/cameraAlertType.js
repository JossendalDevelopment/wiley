function AlertData(data) {
    Object.assign(this, AlertData.template, data);
}

Object.defineProperty(AlertData, 'template',  {
    get() {
        return {
            'alertStatus': '',
            'type': '',
            'detectedObject': '',
            'probability': '',
            'time': '',
            'cameraId': null,
            'camNumber': null,
            'name': '',
            'sourceData': {
                'src': '',
                'type': ''
            }
        }
    }
});

export default AlertData;
