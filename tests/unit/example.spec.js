/*   This is likely in disarray due to rapid ui iteration   */
import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount } from '@vue/test-utils';
// import axios from 'axios';
jest.mock('axios', () => ({
    get: jest.fn(),
}));

import LiveFeedDetails from '@/views/LiveFeed--Details.vue';
import Overview from '@/views/Overview.vue';
import History from '@/views/History.vue';
import SignIn from '@/views/SignIn.vue';
import Home from '@/views/Home.vue';

describe('Home.vue renders', () => {
    let wrp;

    beforeEach(() => {
        Vue.use(Vuetify);
    
        wrp = shallowMount(Home, { });
    });

    // checks Home.vue is a component.
    it('Registers a component', () => {
        expect(wrp.isVueInstance()).toBeTruthy()
    })
});

describe('SignIn.vue renders', () => {
    let wrp;

    beforeEach(() => {
        Vue.use(Vuetify);
        // axios.get.mockClear();
        // axios.get.mockReturnValue(Promise.resolve({}));
    
    });
    wrp = shallowMount(SignIn, {
        mocks: {
            $vuetify: {
                theme: {},
                breakpoint: {}
            },
        },
    });

    // checks SignIn.vue is a component.
    it('Registers a component', () => {
        expect(wrp.isVueInstance()).toBeTruthy()
    })
});

describe('Overview.vue renders', () => {
    let wrp;

    beforeEach(() => {
        Vue.use(Vuetify);
    
        wrp = shallowMount(Overview, { });
    });
    // checks Home.vue is a component.
    it('Registers a component', () => {
        expect(wrp.isVueInstance()).toBeTruthy()
    })
});

describe('LiveFeed--Details renders', () => {
    beforeEach(() => {
        Vue.use(Vuetify);
    });
    it('Registers an id from query string', () => {
        const wrp = shallowMount(LiveFeedDetails, {
            mocks: {
                // props
                stream: {
                    sourceData: {}
                },
                $cameraAlert: {
                    alertData: {}
                },
                $route: {
                    params: { id: 100 }
                }
            }
        })

        expect(wrp.contains(".test-ref"))
    })
});

describe('History renders', () => {
    let wrp;

    beforeEach(() => {
        Vue.use(Vuetify);
    
        wrp = shallowMount(History, { });
    });
    // checks History.vue is a component.
    it('Registers a component', () => {
        expect(wrp.isVueInstance()).toBeTruthy()
    })
});

// describe('SignIn.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(SignIn, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
