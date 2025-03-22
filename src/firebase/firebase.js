import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAeuHW-vurwc7nsQMdQg4J9WCGte2jF9TM",
    authDomain: "clientstilinkadb-01.firebaseapp.com",
    projectId: "clientstilinkadb-01",
    storageBucket: "clientstilinkadb-01.firebasestorage.app",
    messagingSenderId: "233009772077",
    appId: "1:233009772077:web:44597a400071bb2bf2aaa4",
    measurementId: "G-BPY7PPT4E8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
