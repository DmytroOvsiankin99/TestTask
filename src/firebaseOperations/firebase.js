import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCWayH71xXdNnwW0rIha5M1yYQXySZZu-w",
    authDomain: "testtask-c0677.firebaseapp.com",
    databaseURL: "https://testtask-c0677.firebaseio.com",
    projectId: "testtask-c0677",
    storageBucket: "testtask-c0677.appspot.com",
    messagingSenderId: "584950738794",
    appId: "1:584950738794:web:e147d179fbfdb7797fbf13",
    measurementId: "G-VEMFM4WTYK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export default firebase;