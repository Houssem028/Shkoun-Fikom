import {
  loginWithFacebook,
  handleFacebookRedirect,
  onAuthStateChanged
} from "./firebase.js";

const loginButton = document.getElementById("facebookLogin");
const message = document.getElementById("message");

console.log("🔥 APP.JS NEW VERSION LOADED");
console.log("🔥 LOGIN METHOD: REDIRECT");


// =====================================
// FACEBOOK RETURN
// =====================================

handleFacebookRedirect()
  .then((user) => {

    if (!user) {
      return;
    }

    console.log("✅ FACEBOOK USER:", user);

    message.textContent =
      "تم تسجيل الدخول بنجاح ✅";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 700);

  })
  .catch((error) => {

    console.error(
      "❌ REDIRECT RESULT ERROR:",
      error
    );

    message.textContent =
      "خطأ: " +
      (error.code || "غير معروف");
  });


// =====================================
// LOGIN
// =====================================

loginButton.addEventListener("click", async () => {

  console.log("🔥 FACEBOOK BUTTON CLICKED");

  message.textContent =
    "جاري فتح Facebook...";

  loginButton.disabled = true;

  loginButton.style.opacity = "0.6";

  try {

    await loginWithFacebook();

  } catch (error) {

    console.error(
      "❌ LOGIN ERROR:",
      error
    );

    message.textContent =
      "خطأ: " +
      (error.code || "غير معروف");

    loginButton.disabled = false;

    loginButton.style.opacity = "1";
  }

});


// =====================================
// AUTH STATE
// =====================================

onAuthStateChanged((user) => {

  if (user) {

    console.log(
      "✅ LOGGED IN:",
      user.displayName
    );

  } else {

    console.log(
      "ℹ️ NO USER"
    );

  }

});
