const data = JSON.parse(localStorage.getItem("selectedJob"));

if (data) {
  document.getElementById("title").innerText = data.title;
  document.getElementById("date").innerText = data.lastDate;
  document.getElementById("desc").innerText = data.desc;

  document.getElementById("applyBtn").onclick = function() {
    window.open(data.link, "_blank");
  };
}