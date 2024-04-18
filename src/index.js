import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBsKMrz9sACS0Tx8CG2mNlMtDPOxHT0HPM",
    authDomain: "missionmatch-3fb9a.firebaseapp.com",
    projectId: "missionmatch-3fb9a",
    storageBucket: "missionmatch-3fb9a.appspot.com",
    messagingSenderId: "469502442024",
    appId: "1:469502442024:web:25c4305fb68af05529131d",
    measurementId: "G-2KYPEMD00C"
});

export const auth = getAuth(firebaseApp);
export const storage = getStorage();
export const db = getFirestore();