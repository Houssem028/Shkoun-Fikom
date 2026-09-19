// =====================================
// شكون فيكم؟
// FIREBASE.JS
// =====================================

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


// =====================================
// FIREBASE CONFIG
// =====================================

const firebaseConfig = {

  apiKey:
    "AIzaSyD7mgqUztZqtQDvw3dDmASkbokqcH9Oi84",

  authDomain:
    "shkoun-fikom.firebaseapp.com",

  projectId:
    "shkoun-fikom",

  storageBucket:
    "shkoun-fikom.firebasestorage.app",

  messagingSenderId:
    "884631331051",

  appId:
    "1:884631331051:web:7a23dba6b6a1cfed7e5eae"

};


// =====================================
// INITIALIZE
// =====================================

const app =
  initializeApp(firebaseConfig);


const db =
  getFirestore(app);


// =====================================
// EXPORT
// =====================================

export {

  db,

  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp

};
