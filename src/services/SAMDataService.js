import store from "@/store";

class SAMDataService {

    setup() {
        this.initVocalisationList();
    }

    initVocalisationList() {
        let req = require.context('@/assets/vocs', false, /^.*\.wav$/);
        var vocList = req.keys().slice();
        // Shuffle the list
        for (let i = vocList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [vocList[i], vocList[j]] = [vocList[j], vocList[i]];
        }
        // Remove prefix "./"
        vocList.forEach((voc, idx) => {
            vocList[idx] = voc.slice(2);
        });
        store.commit("updateVocalisationList", vocList);
    }

    registerDB(db) {
        this.db = db;
    }

    rate(vocIdx, target, type, rating) {
        let voc = store.state.vocalisationList[vocIdx];
        let [speaker, emotion] = voc.slice(0, -4).split("_"); // remove ".wav" and extract speaker, emotion

        store.commit("updateRating", {
            target: target,
            type: type,
            idx: vocIdx,
            rating: rating
        });
        this.db.newRating(speaker, emotion, target, type, rating);

        if (this.vocalisationCompleted(vocIdx)) {
            store.commit("completeVocalisation", vocIdx);
        }
    }

    vocalisationCompleted(vocIdx) {
        // return false if exists any unrated scales
        for (let target in store.state.ratings){
            for (let type in store.state.ratings[target]){
                if (isNaN(store.state.ratings[target][type][vocIdx])) {return false;}
            }
        }
        return true;
    }
}

export default new SAMDataService();
