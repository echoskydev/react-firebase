import fireabase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBv66aqD3SGJdKGqlBx9m8uTdS34xqjBjw",
  authDomain: "react-fireabase-afd3a.firebaseapp.com",
  databaseURL: "https://react-fireabase-afd3a.firebaseio.com",
  projectId: "react-fireabase-afd3a",
  storageBucket: "react-fireabase-afd3a.appspot.com",
  messagingSenderId: "960321686299",
  appId: "1:960321686299:web:74bbd626fae5f6792d21be",
};

const firebaseApp = fireabase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
