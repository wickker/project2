console.log("script sort by discipline!");

function goToPage(event) {
  let discId = event.target.value;
  let link = "/discipline/" + discId;
  window.location.href = link;
}

function initDropdown() {
  let selectDisc = document.getElementById("discipline-type");
  selectDisc.addEventListener("change", goToPage);
}

initDropdown();