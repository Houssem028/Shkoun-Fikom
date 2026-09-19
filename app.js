// =====================================
// شكون فيكم؟
// APP.JS
// =====================================


// =====================================
// ELEMENTS
// =====================================

const nameScreen =
  document.getElementById("nameScreen");

const homeScreen =
  document.getElementById("homeScreen");

const joinScreen =
  document.getElementById("joinScreen");


const playerName =
  document.getElementById("playerName");

const welcomeName =
  document.getElementById("welcomeName");


const continueBtn =
  document.getElementById("continueBtn");

const createRoomBtn =
  document.getElementById("createRoomBtn");

const joinRoomBtn =
  document.getElementById("joinRoomBtn");

const changeNameBtn =
  document.getElementById("changeNameBtn");

const backBtn =
  document.getElementById("backBtn");

const nameMessage =
  document.getElementById("nameMessage");


// =====================================
// LOAD SAVED NAME
// =====================================

const savedName =
  localStorage.getItem("shkounPlayerName");


if (savedName) {

  playerName.value =
    savedName;

  showHome();

}


// =====================================
// CONTINUE
// =====================================

continueBtn.addEventListener(
  "click",
  saveName
);


playerName.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      saveName();

    }

  }
);


// =====================================
// SAVE NAME
// =====================================

function saveName() {

  const name =
    playerName.value.trim();


  if (!name) {

    nameMessage.textContent =
      "اكتب اسمك أولاً 👀";

    return;

  }


  if (name.length < 2) {

    nameMessage.textContent =
      "الاسم لازم يكون حرفين على الأقل 😅";

    return;

  }


  if (name.length > 20) {

    nameMessage.textContent =
      "الاسم طويل برشا 😅";

    return;

  }


  localStorage.setItem(
    "shkounPlayerName",
    name
  );


  nameMessage.textContent =
    "";


  showHome();

}


// =====================================
// SHOW HOME
// =====================================

function showHome() {

  const name =
    localStorage.getItem(
      "shkounPlayerName"
    );


  if (!name) {

    showName();

    return;

  }


  welcomeName.textContent =
    name;


  nameScreen.classList.add(
    "hidden"
  );

  joinScreen.classList.add(
    "hidden"
  );

  homeScreen.classList.remove(
    "hidden"
  );

}


// =====================================
// SHOW NAME
// =====================================

function showName() {

  homeScreen.classList.add(
    "hidden"
  );

  joinScreen.classList.add(
    "hidden"
  );

  nameScreen.classList.remove(
    "hidden"
  );

}


// =====================================
// CREATE ROOM
// =====================================

createRoomBtn.addEventListener(
  "click",
  () => {

    const name =
      localStorage.getItem(
        "shkounPlayerName"
      );


    if (!name) {

      showName();

      return;

    }


    /*
      في الخطوة القادمة
      سنربط هذا الزر بـ Firebase
      وننشئ غرفة حقيقية بكود 6 أرقام.
    */

    alert(
      "🎮 إنشاء الغرفة\n\n" +
      "الخطوة القادمة: إنشاء غرفة حقيقية وإعطاؤك كود 6 أرقام."
    );

  }
);


// =====================================
// JOIN ROOM
// =====================================

joinRoomBtn.addEventListener(
  "click",
  () => {

    homeScreen.classList.add(
      "hidden"
    );

    joinScreen.classList.remove(
      "hidden"
    );

  }
);


// =====================================
// BACK
// =====================================

backBtn.addEventListener(
  "click",
  () => {

    showHome();

  }
);


// =====================================
// CHANGE NAME
// =====================================

changeNameBtn.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "shkounPlayerName"
    );


    playerName.value =
      "";


    nameMessage.textContent =
      "";


    showName();

  }
);
