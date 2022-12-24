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
        for (let target in store.state.ratings) {
            for (let type in store.state.ratings[target]) {
                if (isNaN(store.state.ratings[target][type][vocIdx])) { return false; }
            }
        }
        return true;
    }

    quickFillAll() {
        let targets = ['speaker', 'participant'];
        let types = ['valence', 'arousal'];
        targets.forEach((target) => {
            types.forEach((type) => {
                for (let i = 0; i < store.state.numVocalisations; i++) {
                    this.rate(i, target, type, 5);
                }
            })
        })
    }

    async save(callback) {
        try {
            const docRef = await this.db.save();
            this.db.saveCSV(this.getRatingsCSV());
            callback({
                success: true,
                docRef: docRef
            })
        } catch (e) {
            callback({
                success: false,
                error: e
            })
        }
    }

    getRatingsCSV() {
        let csvContent = "data:text/csv;charset=utf-8,"
            + "," + store.state.vocalisationList.join(",") + "\r\n"
            + "Speaker_Valence," + store.state.ratings['speaker']['valence'].join(",") + "\r\n"
            + "Speaker_Arousal," + store.state.ratings['speaker']['arousal'].join(",") + "\r\n"
            + "Participant_Valence," + store.state.ratings['participant']['valence'].join(",") + "\r\n"
            + "Participant_Arousal," + store.state.ratings['participant']['arousal'].join(",") + "\r\n";
        return csvContent;
    }
}

export default new SAMDataService();
