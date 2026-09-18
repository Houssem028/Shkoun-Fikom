import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth,
  FacebookAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaD7zmgqUztZqtQDvw3dDmASkbokqcH9Oi84",
  authDomain: "shkoun-fikom.firebaseapp.com",
  projectId: "shkoun-fikom",
  storageBucket: "shkoun-fikom.firebasestorage.app",
  messagingSenderId: "884631331051",
  appId: "1:884631331051:web:7a23dba6b6a1cfed7e5eae",
  measurementId: "G-ZQ29DQXTWP"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const facebookProvider = new FacebookAuthProvider();


// =====================================
// FACEBOOK LOGIN
// =====================================

async function loginWithFacebook() {

  try {

    await signInWithRedirect(
      auth,
      facebookProvider
    );

  } catch (error) {

    console.error(
      "FACEBOOK LOGIN ERROR:",
      error
    );

    throw error;
  }
}


// =====================================
// HANDLE FACEBOOK RETURN
// =====================================

async function handleFacebookRedirect() {

  try {

    const result =
      await getRedirectResult(auth);

    if (!result) {
      return null;
    }

    const user = result.user;

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
      "FACEBOOK REDIRECT ERROR:",
      error
    );

    alert(
      "❌ خطأ تسجيل الدخول\n\n" +
      "الكود: " +
      (error.code || "غير معروف") +
      "\n\n" +
      (error.message || "")
    );

    throw error;
  }
}


// =====================================
// LOGOUT
// =====================================

async function logout() {

  await signOut(auth);

}


// =====================================
// EXPORT
// =====================================

export {
  auth,
  db,
  loginWithFacebook,
  handleFacebookRedirect,
  logout,
  onAuthStateChanged
};
