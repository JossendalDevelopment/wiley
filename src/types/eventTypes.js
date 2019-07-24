function EventTypes(data) {
    Object.assign(this, EventTypes.template, data);
}

Object.defineProperty(EventTypes, 'template', {
    get() {
        return {
            employee: {
                name: 'Employee',
                type: 'employee',
                count: 0,
                events: [],
            },
            intruder: {
                name: 'Intruder',
                type: 'intruder',
                count: 0,
                events: [],
            },
            train: {
                name: 'Train',
                type: 'train',
                count: 0,
                events: [],
            },
            animal: { name: 'Animal', type: 'animal', count: 0, events: [] },
            'false-alarm': {
                name: 'False Alarm',
                type: 'false-alarm',
                count: 0,
                events: [],
            },
        };
    },
});

export default EventTypes;
