// 🔥 YOUR FIREBASE CONFIG (REPLACE THIS)
const firebaseConfig = {
  apiKey: "AIzaSyDsX8CUvpPJngRZG2Dw4APCb7ISwd1GumM",
  authDomain: "examnotifyindia.firebaseapp.com",
  projectId: "examnotifyindia",
  storageBucket: "examnotifyindia.firebasestorage.app",
  messagingSenderId: "109226861144",
  appId: "1:109226861144:web:28325a323fd6b04cbae02d"
};
// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("signupBtn").addEventListener("click", signup);

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");

      window.location.href = redirect ? redirect : "index.html";
    })
    .catch(err => alert(err.message));
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");

      window.location.href = redirect ? redirect : "index.html";
    })
    .catch(err => alert(err.message));
}

// 🔄 SWITCH UI
function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}