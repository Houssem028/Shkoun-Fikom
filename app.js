// =====================================
// شكون فيكم؟
// APP.JS
// =====================================


// =====================================
// ELEMENTS - MAIN
// =====================================

const nameScreen =
  document.getElementById("nameScreen");

const homeScreen =
  document.getElementById("homeScreen");

const onlineScreen =
  document.getElementById("onlineScreen");

const offlineScreen =
  document.getElementById("offlineScreen");

const playersScreen =
  document.getElementById("playersScreen");

const shkounAnaScreen =
  document.getElementById("shkounAnaScreen");

const joinScreen =
  document.getElementById("joinScreen");


// =====================================
// NAME ELEMENTS
// =====================================

const playerName =
  document.getElementById("playerName");

const welcomeName =
  document.getElementById("welcomeName");

const continueBtn =
  document.getElementById("continueBtn");

const changeNameBtn =
  document.getElementById("changeNameBtn");

const nameMessage =
  document.getElementById("nameMessage");


// =====================================
// MAIN MENU BUTTONS
// =====================================

const onlineBtn =
  document.getElementById("onlineBtn");

const offlineBtn =
  document.getElementById("offlineBtn");


// =====================================
// ONLINE BUTTONS
// =====================================

const createRoomBtn =
  document.getElementById("createRoomBtn");

const joinRoomBtn =
  document.getElementById("joinRoomBtn");

const onlineBackBtn =
  document.getElementById("onlineBackBtn");


// =====================================
// OFFLINE BUTTONS
// =====================================

const offlineBackBtn =
  document.getElementById("offlineBackBtn");

const shkounFikomBtn =
  document.getElementById("shkounFikomBtn");

const shkounAnaBtn =
  document.getElementById("shkounAnaBtn");


// =====================================
// PLAYERS SCREEN
// =====================================

const playersBackBtn =
  document.getElementById("playersBackBtn");

const playerCountButtons =
  document.querySelectorAll(
    ".player-count"
  );

const playersMessage =
  document.getElementById(
    "playersMessage"
  );


// =====================================
// SHKOUN ANA
// =====================================

const shkounAnaBackBtn =
  document.getElementById(
    "shkounAnaBackBtn"
  );

const startShkounAnaBtn =
  document.getElementById(
    "startShkounAnaBtn"
  );


// =====================================
// JOIN ROOM
// =====================================

const backBtn =
  document.getElementById("backBtn");


// =====================================
// SCREEN HELPER
// =====================================

function hideAllScreens() {

  const screens = [
    nameScreen,
    homeScreen,
    onlineScreen,
    offlineScreen,
    playersScreen,
    shkounAnaScreen,
    joinScreen
  ];


  screens.forEach(
    (screen) => {

      if (screen) {

        screen.classList.add(
          "hidden"
        );

      }

    }
  );

}


// =====================================
// SHOW SCREEN
// =====================================

function showScreen(screen) {

  hideAllScreens();

  if (screen) {

    screen.classList.remove(
      "hidden"
    );

  }

}


// =====================================
// LOAD SAVED NAME
// =====================================

const
