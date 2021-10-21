import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.js';
import voting from './modules/voting.js';
import notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        voting,
        notification
    },
});

