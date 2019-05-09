import store from '@/store/index.js'

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                "$auth"() {
                    var auth = store.getters['authentication/user'];
                    auth.login = (employeeEmail, password) => {
                        return store.dispatch('authentication/login', {
                            employeeEmail: employeeEmail, 
                            password: password
                        });
                    }
                    auth.logout = () => {
                        return store.dispatch('authentication/logout');
                    }
                    return auth;
                }
            }
        });
    }
}
