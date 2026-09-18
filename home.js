import {
  auth,
  onAuthStateChanged,
  logout
} from "./firebase.js";

const playerName = document.getElementById("playerName");
const playerPhoto = document.getElementById("playerPhoto");

const logoutButton = document.getElementById("logoutButton");
const createRoomButton = document.getElementById("createRoomButton");
const joinRoomButton = document.getElementById("joinRoomButton");


// ==============================
// CHECK LOGIN
// ==============================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // اسم اللاعب
  playerName.textContent =
    user.displayName || "لاعب";

  // صورة اللاعب
  if (user.photoURL) {
    playerPhoto.src = user.photoURL;
  }

});


// ==============================
// CREATE ROOM
// ==============================

createRoomButton.addEventListener("click", () => {

  window.location.href = "create-room.html";

});


// ==============================
// JOIN ROOM
// ==============================

joinRoomButton.addEventListener("click", () => {

  window.location.href = "join-room.html";

});


// ==============================
// LOGOUT
// ==============================

logoutButton.addEventListener("click", async () => {

  logoutButton.disabled = true;
  logoutButton.textContent = "جاري الخروج...";

  try {

    await logout();

    window.location.href = "index.html";

  } catch (error) {

    console.error("LOGOUT ERROR:", error);

    alert("❌ صار خطأ أثناء تسجيل الخروج");

    logoutButton.disabled = false;
    logoutButton.textContent = "خروج";

  }

});
