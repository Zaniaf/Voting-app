const state = {
    start: false
}

const mutations = {
    SET_APP_STATE: (state, payload) => {
        state.start = payload;
    }
};

const getters = {
    returnAppState: state => {
        return state.start;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
