import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyAoVqQKxkU6XjuQXqtqAwtI_sWNW1uHOHE",
    authDomain: "cardgame-0817.firebaseapp.com",
    databaseURL: "https://cardgame-0817.firebaseio.com",
    projectId: "cardgame-0817",
    storageBucket: "cardgame-0817.appspot.com",
    messagingSenderId: "927736988243",
    timestampsInSnapshots: true,
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
