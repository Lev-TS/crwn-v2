import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBLvn3HozEyr7oaUSptkPaKINXAt6_qa3U",
    authDomain: "crwn-db-90304.firebaseapp.com",
    databaseURL: "https://crwn-db-90304.firebaseio.com",
    projectId: "crwn-db-90304",
    storageBucket: "crwn-db-90304.appspot.com",
    messagingSenderId: "255258589511",
    appId: "1:255258589511:web:94e954b057c1b03a66f462",
    measurementId: "G-QML6K72BJF"
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;