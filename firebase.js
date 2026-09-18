import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


// ===============================
// Firebase Configuration
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyD7mgqUztZqtQDvw3dDmASkbokqcH9Oi84",
  authDomain: "shkoun-fikom.firebaseapp.com",
  projectId: "shkoun-fikom",
  storageBucket: "shkoun-fikom.firebasestorage.app",
  messagingSenderId: "884631331051",
  appId: "1:884631331051:web:7a23dba6b6a1cfed7e5eae",
  measurementId: "G-ZQ29DQXTWP"
};


// ===============================
// Initialize Firebase
// ===============================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


// ===============================
// Facebook Provider
// ===============================

const facebookProvider = new FacebookAuthProvider();


// ===============================
// Login with Facebook
// ===============================

async function loginWithFacebook() {

  try {

    const result = await signInWithPopup(
      auth,
      facebookProvider
    );

    const user = result.user;


    // حفظ بيانات اللاعب في Firestore

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,

        name:
          user.displayName ||
          "لاعب",

        email:
          user.email ||
          "",

        photo:
          user.photoURL ||
          "",

        updatedAt:
          serverTimestamp()
      },

      {
        merge: true
      }
    );


    return user;

  } catch (error) {

    console.error(
      "FACEBOOK LOGIN ERROR:",
      error
    );


    // إظهار الخطأ الحقيقي

    alert(
      "❌ خطأ تسجيل الدخول\n\n" +
      "الكود: " +
      (error.code || "غير معروف") +
      "\n\n" +
      "التفاصيل:\n" +
      (error.message || "لا توجد تفاصيل")
    );


    throw error;
  }
}


// ===============================
// Logout
// ===============================

async function logout() {

  await signOut(auth);

}


// ===============================
// Export
// ===============================

export {

  auth,

  db,

  loginWithFacebook,

  logout,

  onAuthStateChanged

};
