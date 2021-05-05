import firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyD8Iu0v1y1HNobCFapoR27u4o7oQGzK4bE",
    authDomain: "poll-b8faa.firebaseapp.com",
    databaseURL: "https://poll-b8faa-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "poll-b8faa",
    storageBucket: "poll-b8faa.appspot.com",
    messagingSenderId: "552391798670",
    appId: "1:552391798670:web:ff744b72773f51d0193edf",
    measurementId: "G-3DTHGBLY9H"
};

firebase.initializeApp(firebaseConfig)

export  default firebase;