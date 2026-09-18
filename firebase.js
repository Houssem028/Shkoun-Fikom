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

const firebaseConfig = {
  apiKey: "AIzaSyD7mgqUztZqtQDvw3dDmASkbokqcH9Oi84",
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

async function loginWithFacebook() {
  try {
    const result = await signInWithPopup(auth, facebookProvider);

    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName || "لاعب",
        email: user.email || "",
        photo: user.photoURL || "",
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    return user;
  } catch (error) {
    console.error("Facebook Login Error:", error);
    throw error;
  }
}

async function logout() {
  await signOut(auth);
}

export {
  auth,
  db,
  loginWithFacebook,
  logout,
  onAuthStateChanged
};
