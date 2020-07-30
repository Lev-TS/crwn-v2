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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // if an user is not authenticated don't proceed
    if (!userAuth) return;
    
    // if an user is authenticated get reference document of that user 
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // get the snapshot of that user
    const snapShot = await userRef.get()

    // if an user doesn't exist in the database add a new document and 
    // save their display name, email, date when the document was created,
    // and any other data that will be passed into this function. 
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config)

export const firestore = firebase.firestore(); /* for database */
export const auth = firebase.auth(); /* for authentication */

// auth with google
const provider = new firebase.auth.GoogleAuthProvider(); 
// always trigger pop up when we auth
provider.setCustomParameters({ prompt: 'select_account' }); 
// triggered pop up is to Google method, there 
// are many other options FB, Twitter, etc.
export const signInWithGoogle = () => auth.signInWithPopup(provider); 

export default firebase;

