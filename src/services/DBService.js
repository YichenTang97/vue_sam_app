import { firestore } from "@/firebaseInit";
import store from "@/store";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

class MockDB {
    // eslint-disable-next-line no-unused-vars
    newRating(speaker, emotion, target, type, rating) { }

    save() {
        return new Promise((myResolve) => {
            myResolve({
                id: 'demoDocID'
            });
        });
    }

    // eslint-disable-next-line no-unused-vars
    saveCSV(csvContent) { }
}

class FirestoreDB {
    constructor() {
        this.db = firestore;
    }

    async newRating(speaker, emotion, target, type, rating) {
        try {
            const docRef = await addDoc(collection(this.db, `users/${store.state.user.uid}/ratings`), {
                speaker: speaker,
                emotion: emotion,
                target: target,
                type: type,
                rating: rating,
                time: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    save() {
        return addDoc(collection(this.db, `users/${store.state.user.uid}/final_ratings`), {
            vocalisation_list: store.state.vocalisationList,
            ratings: store.state.ratings,
            time: serverTimestamp()
        });
    }

    // eslint-disable-next-line no-unused-vars
    saveCSV(csvContent) { }
}

export { MockDB, FirestoreDB };
