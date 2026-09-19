import {
  loginWithFacebook,
  handleFacebookRedirect,
  onAuthStateChanged
} from "./firebase.js";


// =====================================
// ELEMENTS
// =====================================

const loginButton =
  document.getElementById("facebookLogin");

const message =
  document.getElementById("message");


// =====================================
// CHECK ELEMENTS
// =====================================

if (!loginButton) {

  console.error(
    "❌ facebookLogin button not found"
  );

}

if (!message) {

  console.error(
    "❌ message element not found"
  );

}


// =====================================
// FACEBOOK RETURN
// =====================================

handleFacebookRedirect()

  .then((user) => {

    if (!user) {
      return;
    }


    console.log(
      "✅ FACEBOOK USER:",
      user
    );


    if (message) {

      message.textContent =
        "تم تسجيل الدخول بنجاح ✅";

    }


    setTimeout(() => {

      window.location.href =
        "home.html";

    }, 700);

  })

  .catch((error) => {

    console.error(
      "❌ FACEBOOK REDIRECT ERROR:",
      error
    );


    if (message) {

      message.textContent =
        "خطأ: " +
        (error.code || "غير معروف");

    }

  });


// =====================================
// FACEBOOK LOGIN BUTTON
// =====================================

if (loginButton) {

  loginButton.addEventListener(
    "click",
    async () => {

      console.log(
        "🔥 FACEBOOK BUTTON CLICKED"
      );


      if (message) {

        message.textContent =
          "جاري فتح Facebook...";

      }


      loginButton.disabled = true;

      loginButton.style.opacity =
        "0.6";


      try {

        await loginWithFacebook();

      }

      catch (error) {

        console.error(
          "❌ FACEBOOK LOGIN ERROR:",
          error
        );


        if (message) {

          message.textContent =
            "خطأ: " +
            (error.code || "غير معروف");

        }


        loginButton.disabled =
          false;

        loginButton.style.opacity =
          "1";

      }

    }
  );

}


// =====================================
// AUTH STATE
// =====================================

onAuthStateChanged(
  auth,
  (user) => {

    if (user) {

      console.log(
        "✅ LOGGED IN:",
        user.displayName
      );

    }

    else {

      console.log(
        "ℹ️ NO USER"
      );

    }

  }
);
