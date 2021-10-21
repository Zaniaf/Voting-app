const state = {
    questionnaire: [],
    votes: []
}

const mutations = {
    SET_QUESTIONNAIRE: (state, payload) => {
        state.questionnaire = payload;
    },
    TRACK_VOTES: (state, payload) => {
        state.votes = payload;
    }
}

const getters = {
    returnQuestionnaire: state => {
        return state.questionnaire;
    },
    returnVotes: state => {
        return state.votes;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
