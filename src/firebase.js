import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1I1cPPnhdg5EYb_RpjbrDCEKSttfzKqg",
    authDomain: "madness-crud.firebaseapp.com",
    projectId: "madness-crud",
    storageBucket: "madness-crud.appspot.com",
    messagingSenderId: "655308616623",
    appId: "1:655308616623:web:776aad71060e07bc4d355a"
  };
  
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();