import Vuex from "vuex";
 
var numVocalisations = 50;

export default new Vuex.Store({
 state: {
    user: {
        username: '',
        password: '',
        authenticated: false,
        uid: ''
    },
    testUser: "test",
    isDemo: false,
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
    setUID (state, uid) {
        state.user.uid = uid;
    },
    setDemoMode (state, isDemo) {
        state.isDemo = isDemo;
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