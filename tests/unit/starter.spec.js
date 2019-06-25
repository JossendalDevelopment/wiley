/*   This is completely fubar, jest continually fails on a css import which it doesn't know how to handle.
     All this despite the transform prop set in jest.config.js   */
import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount } from '@vue/test-utils';

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
            $auth: {
                status: {}
            }
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
    });
    wrp = shallowMount(History, {
        mocks: {
            $events: {
                getAllClassifiedEvents: () => {}
            }
        }
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
