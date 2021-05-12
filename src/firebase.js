import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDbNSpcYsti9asje1XUE-01LKMPOgkGSeo",
  authDomain: "jsonformatter-58186.firebaseapp.com",
  projectId: "jsonformatter-58186",
  storageBucket: "jsonformatter-58186.appspot.com",
  messagingSenderId: "764159714675",
  appId: "1:764159714675:web:e08c4ea0f665d18f4a9106",
  measurementId: "G-287D511WJR"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();


const db = firebaseApp.firestore();

export default db;