console.log("script sort by discipline!");

function goToPage(event) {
  let discId = event.target.value;
  let link = "/discipline/" + discId;
  window.location.href = link;
}

let clubsList = document.getElementById("clubs-list");
let athList = document.getElementById("athletes-list");

function showClubs() {
  if (clubsList.hidden === true) {
    clubsList.hidden = false;
  } else {
    clubsList.hidden = true;
  }
}

function showAthletes() {
  let adminCookie = getCookie("admin");
  if (athList.hidden === true && adminCookie && adminCookie !== "") {
    athList.hidden = false;
  } else if (athList.hidden === false && adminCookie && adminCookie !== "") {
    athList.hidden = true;
  } else {
    let adminDiv = document.getElementById("admin-comment");
    athList.hidden = true;
    adminDiv.innerHTML = "";
    let newComment = document.createElement("p");
    newComment.textContent = "Administrative access required to view.";
    newComment.className = "text-danger";
    adminDiv.appendChild(newComment);
  }
}

function initDropdown() {
  let selectDisc = document.getElementById("discipline-type");
  selectDisc.addEventListener("change", goToPage);
  let clubsButton = document.getElementById("view-clubs");
  let athButton = document.getElementById("view-athletes");
  clubsButton.addEventListener("click", showClubs);
  athButton.addEventListener("click", showAthletes);
}

initDropdown();
