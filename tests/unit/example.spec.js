import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

import SignIn from '@/views/SignIn.vue';
import Home from '@/views/Home.vue';

describe('SignIn.vue renders', () => {
    let wrp;

    beforeEach(() => {
        Vue.use(Vuetify);
    
        wrp = shallowMount(SignIn, { });
    });

    // checks SignIn.vue is a component.
    it('Registers a component', () => {
        expect(wrp.isVueInstance()).toBeTruthy()
    })
})
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
})
// describe('SignIn.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(SignIn, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
