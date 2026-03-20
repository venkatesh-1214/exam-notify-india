const container = document.getElementById("savedJobs");

const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];

function displaySavedJobs() {
  container.innerHTML = "";

  if (saved.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No saved jobs yet</p>";
    return;
  }

  saved.forEach((job, index) => {
    const div = document.createElement("div");
    div.className = "job";

    div.innerHTML = `
      <h3>${job.title}</h3>
      <p>Last Date: ${job.lastDate}</p>
      <button onclick='viewDetails(${JSON.stringify(job)})'>View Details</button>
      <button onclick='removeJob(${index})'>❌ Remove</button>
    `;

    container.appendChild(div);
  });
}

// View details
function viewDetails(job) {
  localStorage.setItem("selectedJob", JSON.stringify(job));
  window.location.href = "details.html";
}

// Remove job
function removeJob(index) {
  saved.splice(index, 1);
  localStorage.setItem("savedJobs", JSON.stringify(saved));
  displaySavedJobs();
}

displaySavedJobs();