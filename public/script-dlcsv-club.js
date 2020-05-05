console.log("script dl csv club!");

//Same as csv download for athletes
function downloadFile(data, filename, mime, bom) {
  var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  var blob = new Blob(blobData, { type: mime || "application/octet-stream" });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);
    var tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", filename);
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    setTimeout(function () {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 0);
  }
}

//Same as csv download for athletes
function initDlButton() {
  let dlButton = document.getElementById("download-button-2");
  let download = () => {
    var responseHandler = function () {
      let data = this.responseText;
      downloadFile(data, "club-details.csv");
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "https://gentle-castle-21661.herokuapp.com/profiles/clubs/api";
    request.open("GET", url);
    request.send();
  };
  dlButton.addEventListener("click", download);
}

let sortButton = document.getElementById("sort-button");

//Toggles how club data is displayed on the screen - alphabetically or by number of affiliated athletes 
function toggleSort(event) {
  let alphaDiv = document.getElementById("by-alpha");
  let athCountDiv = document.getElementById("by-athcount");
  if (athCountDiv.hidden === true) {
    athCountDiv.hidden = false;
    alphaDiv.hidden = true;
    sortButton.innerText = "Sort Clubs Alphabetically";
  } else {
    alphaDiv.hidden = false;
    athCountDiv.hidden = true;
    sortButton.innerText = "Sort Clubs By Popularity";
  }
}

function initToggleSort() {
  sortButton.addEventListener("click", toggleSort);
}

initDlButton();
initToggleSort();
