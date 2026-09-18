import {
  loginWithFacebook,
  onAuthStateChanged
} from "./firebase.js";

const loginButton = document.getElementById("facebookLogin");
const message = document.getElementById("message");

loginButton.addEventListener("click", async () => {

  message.textContent = "جاري تسجيل الدخول...";

  loginButton.disabled = true;
  loginButton.style.opacity = "0.6";

  try {

    await loginWithFacebook();

    message.textContent = "تم تسجيل الدخول بنجاح ✅";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 700);

  } catch (error) {

    console.error(error);

    let text = "حدث خطأ أثناء تسجيل الدخول.";

    if (error.code === "auth/popup-closed-by-user") {
      text = "تم إغلاق نافذة تسجيل الدخول.";
    }

    if (error.code === "auth/account-exists-with-different-credential") {
      text = "هذا البريد مرتبط بطريقة تسجيل دخول أخرى.";
    }

    message.textContent = text;

    loginButton.disabled = false;
    loginButton.style.opacity = "1";
  }

});

onAuthStateChanged(
  (user) => {

    if (user) {
      console.log("Logged in:", user.displayName);
    }

  }
);
