import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBeLW5_X-tLbz0FVAPAoyz5bLadZ5PRL14",
  authDomain: "data-store-69911.firebaseapp.com",
  projectId: "data-store-69911",
  storageBucket: "data-store-69911.appspot.com",
  messagingSenderId: "282072649241",
  appId: "1:282072649241:web:669dd64a4e217ae5002488",
});

var db = firebaseApp.firestore();
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
export { db, auth, firestore };
