import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyAKHNUIeJUBkA9tpYldJ4KbkqSCk5X7rlI",
    authDomain: "project-1-d0647.firebaseapp.com",
    databaseURL: "https://project-1-d0647-default-rtdb.firebaseio.com",
    projectId: "project-1-d0647",
    storageBucket: "project-1-d0647.appspot.com",
    messagingSenderId: "384378696329",
    appId: "1:384378696329:web:799ec1c492ff20a27dcc58"
};
// Initialize Firebase

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref()