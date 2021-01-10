import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCOx8eLoxTpcH2H42slunr1Ww6XFHhLPcc",
    authDomain: "dazzling-netflix-demo.firebaseapp.com",
    projectId: "dazzling-netflix-demo",
    storageBucket: "dazzling-netflix-demo.appspot.com",
    messagingSenderId: "671200860892",
    appId: "1:671200860892:web:720ce6f634dfa7e6127219",
    measurementId: "G-RNRGN1LSEC"
};

const firebase = Firebase.initializeApp(config);

export {firebase};