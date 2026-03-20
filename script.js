const firebaseConfig = {
  apiKey: "AIzaSyDsX8CUvpPJngRZG2Dw4APCb7ISwd1GumM",
  authDomain: "examnotifyindia.firebaseapp.com",
  projectId: "examnotifyindia",
  storageBucket: "examnotifyindia.firebasestorage.app",
  messagingSenderId: "109226861144",
  appId: "1:109226861144:web:28325a323fd6b04cbae02d"
};

// INIT
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// JOB DATA
let jobs = [
  { 
    title: "TNPSC Group 4", 
    lastDate: "30 April 2026",
    desc: "Tamil Nadu Public Service Commission Group 4 भर्ती.",
    link: "https://www.tnpsc.gov.in"
  },
  { 
    title: "SSC CHSL", 
    lastDate: "15 May 2026",
    desc: "Staff Selection Commission CHSL recruitment.",
    link: "https://ssc.nic.in"
  },
  {
  title: "Railway RRB NTPC",
  lastDate: "20 July 2026",
  desc: "Railway भर्ती notification",
  link: "https://indianrailways.gov.in"
},
  { 
    title: "UPSC Civil Services", 
    lastDate: "10 June 2026",
    desc: "UPSC IAS/IPS परीक्षा notification.",
    link: "https://upsconline.nic.in"
  }
];

// CHECK LOGIN
firebase.auth().onAuthStateChanged(function(user) {
  console.log("User:", user);

  if (!user) {
    window.location.href = "login.html?redirect=index.html";
  } else {
    loadJobs();
  }
});

// 🔥 FORCE LOAD FOR MOBILE
window.onload = function() {
  setTimeout(() => {
    loadJobs();
  }, 1000);
};

// LOGOUT
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

// GO TO SAVED
function goToSaved() {
  const user = firebase.auth().currentUser;

  if (!user) {
    window.location.href = "login.html?redirect=saved.html";
  } else {
    window.location.href = "saved.html";
  }
}

// LOAD JOBS
function loadJobs(list = jobs) {
  const container = document.getElementById("jobList");

  if (!container) {
    console.log("jobList not found ❌");
    return;
  }

  container.innerHTML = "";

  list.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h3>${job.title}</h3>
      <p>📅 Last Date: ${job.lastDate}</p>

      <button onclick='viewDetails(${JSON.stringify(job)})'>📄 View Details</button>
      <button onclick='saveJob(${JSON.stringify(job)})'>❤️ Save</button>
    `;

    container.appendChild(div);
  });
}

// SEARCH
function filterJobs() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = jobs.filter(job => 
    job.title.toLowerCase().includes(search)
  );

  loadJobs(filtered);
}

// VIEW DETAILS
function viewDetails(job) {
  localStorage.setItem("selectedJob", JSON.stringify(job));
  window.location.href = "details.html";
}

// SAVE JOB
function saveJob(job) {
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Login required ❌");
    return;
  }

  db.collection("users")
    .doc(user.uid)
    .collection("savedJobs")
    .add(job)
    .then(() => alert("Saved ❤️"))
    .catch(err => alert(err.message));
}