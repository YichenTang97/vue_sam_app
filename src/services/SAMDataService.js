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
}

export default new SAMDataService();
