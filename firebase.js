// =====================================
// FIREBASE APP
// =====================================

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


// =====================================
// FIREBASE CONFIG
// =====================================

const firebaseConfig = {
  apiKey: "AIzaSyD7mgqUztZqtQDvw3dDmASkbokqcH9Oi84",
  authDomain: "shkoun-fikom.firebaseapp.com",
  projectId: "shkoun-fikom",
  storageBucket: "shkoun-fikom.firebasestorage.app",
  messagingSenderId: "884631331051",
  appId: "1:884631331051:web:7a23dba6b6a1cfed7e5eae",
  measurementId: "G-ZQ29DQXTWP"
};


// =====================================
// INITIALIZE FIREBASE
// =====================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// =====================================
// FACEBOOK PROVIDER
// =====================================

const facebookProvider = new FacebookAuthProvider();


// نطلب البريد الإلكتروني من Facebook
facebookProvider.addScope("email");


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

    alert(
      "❌ صار خطأ في تسجيل الدخول\n\n" +
      "الكود: " +
      (error.code || "غير معروف") +
      "\n\n" +
      (error.message || "")
    );
  }
}


// =====================================
// HANDLE FACEBOOK REDIRECT
// =====================================

async function handleFacebookRedirect() {

  try {

    const result =
      await getRedirectResult(auth);


    // لا توجد نتيجة تسجيل دخول
    if (!result) {
      return null;
    }


    const user = result.user;


    // =================================
    // SAVE USER IN FIRESTORE
    // =================================

    await setDoc(

      doc(
        db,
        "users",
        user.uid
      ),

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


    console.log(
      "✅ Facebook login successful:",
      user
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


    return null;
  }
}


// =====================================
// AUTH STATE
// =====================================

function watchAuthState(callback) {

  return onAuthStateChanged(
    auth,
    callback
  );

}


// =====================================
// LOGOUT
// =====================================

async function logout() {

  try {

    await signOut(auth);

    console.log(
      "✅ تم تسجيل الخروج"
    );

  } catch (error) {

    console.error(
      "LOGOUT ERROR:",
      error
    );

  }

}


// =====================================
// EXPORT
// =====================================

export {

  auth,

  db,

  loginWithFacebook,

  handleFacebookRedirect,

  watchAuthState,

  logout

};
