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
// CHECK FACEBOOK REDIRECT
// =====================================

handleFacebookRedirect()
  .then((user) => {

    if (user) {

      message.textContent =
        "تم تسجيل الدخول بنجاح ✅";

      setTimeout(() => {

        window.location.href =
          "home.html";

      }, 500);

    }

  })
  .catch((error) => {

    console.error(error);

  });


// =====================================
// LOGIN BUTTON
// =====================================

loginButton.addEventListener(
  "click",
  async () => {

    message.textContent =
      "جاري فتح Facebook...";

    loginButton.disabled = true;

    loginButton.style.opacity =
      "0.6";

    try {

      await loginWithFacebook();

      // لا نعمل redirect هنا
      // Facebook سيعيدنا للموقع تلقائيًا

    } catch (error) {

      console.error(error);

      message.textContent =
        "حدث خطأ: " +
        (error.code || "غير معروف");

      loginButton.disabled = false;

      loginButton.style.opacity =
        "1";
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
        "Logged in:",
        user.displayName
      );

    }

  }
);
