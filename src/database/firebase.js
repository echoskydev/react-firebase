import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyBv66aqD3SGJdKGqlBx9m8uTdS34xqjBjw",
  authDomain: "react-fireabase-afd3a.firebaseapp.com",
  databaseURL: "https://react-fireabase-afd3a.firebaseio.com",
  projectId: "react-fireabase-afd3a",
  storageBucket: "react-fireabase-afd3a.appspot.com",
  messagingSenderId: "960321686299",
  appId: "1:960321686299:web:74bbd626fae5f6792d21be",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firesore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebaseApp.storage().ref();
export default firebaseApp;