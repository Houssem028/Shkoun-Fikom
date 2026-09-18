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
    console.error("FULL FIREBASE ERROR:", error);

    message.textContent =
      "خطأ: " +
      (error.code || "غير معروف") +
      " — " +
      (error.message || "لا توجد تفاصيل");

    loginButton.disabled = false;
    loginButton.style.opacity = "1";
  }
});

onAuthStateChanged((user) => {
  if (user) {
    console.log("Logged in:", user.displayName);
  }
});
