// this is purely assumption on what an alerted event might look like

function AlertData(data) {
    Object.assign(this, AlertData.template, data);
}

Object.defineProperty(AlertData, 'template',  {
    get() {
        return {
            'id': '',
            'status': '',
            'type': '',
            'detectedObject': '',
            'probability': '',
            'startTime': '',
            'endTime': '',
            'duration': '',
            'cameraId': null,
            'camNumber': null,
            'camName': '',
            'name': '',
            'sourceData': {
                'src': '',
                'type': ''
            }
        }
    }
});

export default AlertData;
