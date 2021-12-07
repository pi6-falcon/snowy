import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
    },
    plugins: [new VuexPersistence().plugin]
})

export default store;
