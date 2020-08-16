import * as firebase from 'firebase';
import 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAYsszgA8F4QtBzgyVMTZJln6b3GF51k-I",
    authDomain: "gift-1efbb.firebaseapp.com",
    databaseURL: "https://gift-1efbb.firebaseio.com",
    projectId: "gift-1efbb",
    storageBucket: "gift-1efbb.appspot.com",
    messagingSenderId: "756174337496",
    appId: "1:756174337496:web:c90f3aea10e5d168f66ead"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const db = firebase.firestore();
export default firebaseApp.firestore();