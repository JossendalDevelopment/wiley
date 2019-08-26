function EventTypes(data) {
    Object.assign(this, EventTypes.template, data);
}

Object.defineProperty(EventTypes, 'template', {
    get() {
        return {
            employee: {
                name: 'Employee',
                type: 'employee',
                page: 0,
                events: [],
            },
            intruder: {
                name: 'Intruder',
                type: 'intruder',
                page: 0,
                events: [],
            },
            contractor: {
                name: 'Contraactor',
                type: 'contractor',
                page: 0,
                events: [],
            },
            train: {
                name: 'Train',
                type: 'train',
                page: 0,
                events: [],
            },
            animal: { name: 'Animal', type: 'animal', page: 0, events: [] },
            'false-alarm': {
                name: 'False Alarm',
                type: 'false-alarm',
                page: 0,
                events: [],
            },
        };
    },
});

export default EventTypes;
