console.log("script sort by discipline!");

//Makes the discipline drop down list a set of links to the respective sort pages
function goToPage(event) {
  let discId = event.target.value;
  let link = "/discipline/" + discId;
  window.location.href = link;
}

let clubsList = document.getElementById("clubs-list");
let athList = document.getElementById("athletes-list");

//Toggles visibility of the affiliated clubs list 
function showClubs() {
  if (clubsList.hidden === true) {
    clubsList.hidden = false;
  } else {
    clubsList.hidden = true;
  }
}

//Toggles visibility of the affiliated athletes list
function showAthletes() {
  let adminCookie = getCookie("admin");
  //Shows athlete list if admin is logged in, hides on the next click
  if (athList.hidden === true && adminCookie && adminCookie !== "") {
    athList.hidden = false;
  } else if (athList.hidden === false && adminCookie && adminCookie !== "") {
    athList.hidden = true;
  } else {
    //If admin is not logged in, hide athlete list and display error message
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
