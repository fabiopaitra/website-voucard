import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC1V96AZC7ehytwbIfpQxklXHEK_CXq6g8",
  authDomain: "vou-card.firebaseapp.com",
  databaseURL: "https://vou-card.firebaseio.com",
  projectId: "vou-card",
  storageBucket: "vou-card.appspot.com",
  messagingSenderId: "784955472796",
  appId: "1:784955472796:web:4bc2bd5fce5099721fa659",
  measurementId: "G-VJBV973FCK"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.functions().useFunctionsEmulator('http://localhost:5000')
const fireBaseAnalytics = firebase.analytics();

// export firestore database
export default firebaseApp.firestore()