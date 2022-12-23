import Vuex from "vuex";
 
var numVocalisations = 50;

export default new Vuex.Store({
 state: {
    user: {
        username: '',
        password: '',
        authenticated: false
    },

    numVocalisations: numVocalisations,
    vocalisationList: [],
    vocalisationCompleted: new Array(numVocalisations).fill(false),
    ratings: {
        speaker: {
            valence: new Array(numVocalisations).fill(NaN),
            arousal: new Array(numVocalisations).fill(NaN),
        },
        participant: {
            valence: new Array(numVocalisations).fill(NaN),
            arousal: new Array(numVocalisations).fill(NaN),
        }
    }
 },
 mutations: {
    updateUser (state, user) {
        state.user.username = user.username;
        state.user.password = user.password;
    },
    authUser (state, auth) {
        state.user.authenticated = auth;
    },

    updateVocalisationList (state, vocList) {
        state.vocalisationList = vocList;
    },
    completeVocalisation (state, idx) {
        state.vocalisationCompleted[idx] = true;
    },
    updateRating (state, payload) {
        state.ratings[payload.target][payload.type][payload.idx] = payload.rating;
    }
 }
});