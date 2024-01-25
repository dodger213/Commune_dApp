import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAOQMwKKZea9TzteP3h5IXgnPq456bu2zI",
    authDomain: "com-chat-95517.firebaseapp.com",
    projectId: "com-chat-95517",
    storageBucket: "com-chat-95517.appspot.com",
    messagingSenderId: "325214637565",
    appId: "1:325214637565:web:16c9c8f0263573245d5d94",
    measurementId: "G-0M5GGMJ73E"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
