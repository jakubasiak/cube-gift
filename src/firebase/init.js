import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDInpiNhNRv2LKlyiiOjCbvpzpK7qMZQXs',
    authDomain: 'cube-gift.firebaseapp.com',
    databaseURL: 'https://cube-gift.firebaseio.com',
    projectId: 'cube-gift',
    storageBucket: 'cube-gift.appspot.com',
    messagingSenderId: '991063651180',
    appId: '1:991063651180:web:e4538319e4cb5396693949',
    measurementId: 'G-ZNZ9C649FD',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.database();

export default firebaseApp.firestore();