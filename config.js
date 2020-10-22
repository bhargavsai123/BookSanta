import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBHdluTb07UNEKFK2btGDE4m9_Yo_bn0EQ",
  authDomain: "booksanta-c6a2f.firebaseapp.com",
  databaseURL: "https://booksanta-c6a2f.firebaseio.com",
  projectId: "booksanta-c6a2f",
  storageBucket: "booksanta-c6a2f.appspot.com",
  messagingSenderId: "484155594126",
  appId: "1:484155594126:web:44f96630161c46b12140df"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
