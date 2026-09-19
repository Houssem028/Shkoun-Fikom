import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth,
  FacebookAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


// =====================================
// FIREBASE CONFIG
// =====================================

const firebaseConfig = {
  apiKey: "AIzaSyD7mgqUztZqtQDvw3dDmASkbokqcH9Oi84",
  authDomain: "shkoun-fikom.firebaseapp.com",
  projectId: "shkoun-fikom",
  storageBucket: "shkoun-fikom.firebasestorage.app",
  messagingSenderId: "884631331051",
  appId: "1:884631331051:web:7a23dba6b6a1cfed7e5eae"
};


// =====================================
// INITIALIZE FIREBASE
// =====================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// =====================================
// FACEBOOK
// =====================================

const facebookProvider =
  new FacebookAuthProvider();


// =====================================
// LOGIN
// =====================================

async function loginWithFacebook() {

  console.log("🔥 Starting Facebook login...");

  await signInWithRedirect(
    auth,
    facebookProvider
  );

}


// =====================================
// RETURN FROM FACEBOOK
// =====================================

async function handleFacebookRedirect() {

  console.log("🔥 Checking Facebook redirect...");

  const result =
    await getRedirectResult(auth);

  if (!result) {
    return null;
  }

  console.log(
    "✅ Facebook login successful!"
  );

  return result.user;

}


// =====================================
// EXPORT
// =====================================

export {
  auth,
  loginWithFacebook,
  handleFacebookRedirect,
  onAuthStateChanged
};

وبعده استبدل "app.js" بالكامل بهذا:

:::writing{variant="document" id="73185" title="app.js — اختبار تسجيل Facebook"}

import {
  loginWithFacebook,
  handleFacebookRedirect,
  onAuthStateChanged
} from "./firebase.js";


const loginButton =
  document.getElementById("facebookLogin");

const message =
  document.getElementById("message");


// =====================================
// CHECK FACEBOOK RETURN
// =====================================

handleFacebookRedirect()
  .then((user) => {

    if (user) {

      console.log(
        "✅ USER:",
        user
      );

      message.textContent =
        "تم تسجيل الدخول بنجاح ✅";

    }

  })
  .catch((error) => {

    console.error(
      "❌ FIREBASE ERROR:",
      error
    );

    message.textContent =
      "خطأ: " +
      error.code;

  });


// =====================================
// FACEBOOK BUTTON
// =====================================

loginButton.addEventListener(
  "click",
  async () => {

    message.textContent =
      "جاري فتح Facebook...";

    loginButton.disabled = true;

    try {

      await loginWithFacebook();

    } catch (error) {

      console.error(
        "❌ LOGIN ERROR:",
        error
      );

      message.textContent =
        "خطأ: " +
        error.code;

      loginButton.disabled = false;

    }

  }
);


// =====================================
// AUTH STATE
// =====================================

onAuthStateChanged(
  (user) => {

    if (user) {

      console.log(
        "✅ Logged in:",
        user.displayName
      );

    }

  }
);

الآن مهم جدًا ⚠️

لا نضيف Firestore ولا "email" ولا أي شيء آخر.

ارفع الملفين فقط إلى GitHub Pages وجرب الزر.

إذا ظهر لك:

"auth/api-key-not-valid"

فهذا الاختبار سيأكد لنا أن المشكلة تحصل قبل Facebook أصلًا، وننتقل مباشرة لإصلاح الـ API Key بدل ما نضيع وقتك في كود Facebook.
