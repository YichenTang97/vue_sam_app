import { firestore, storage } from "@/firebaseInit";
import store from "@/store";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

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
    saveCSV(csvContent) {
        return new Promise((myResolve) => {
            myResolve({
                metadata: {
                    fullPath: 'demoPath'
                }
            });
        });
    }
}

class FirestoreDB {
    constructor() {
        this.db = firestore;
        this.storage = storage;
    }

    // eslint-disable-next-line no-unused-vars 
    newRating(speaker, emotion, target, type, rating) { }

    save() {
        return addDoc(collection(this.db, `users/${store.state.user.uid}/final_ratings`), {
            vocalisation_list: store.state.vocalisationList,
            ratings: store.state.ratings,
            time: serverTimestamp()
        });
    }

    saveCSV(csvContent) {
        const blob = new Blob([csvContent], { type: "text/csv" });
        const storageRef = ref(storage, `users/${store.state.user.uid}/ratings_${store.state.user.username}_${new Date().toISOString()}.csv`);

        return uploadBytes(storageRef, blob);
    }
}

export { MockDB, FirestoreDB };
