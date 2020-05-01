console.log("script dl csv club!");

function downloadFile(data, filename, mime, bom) {
  var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  var blob = new Blob(blobData, { type: mime || "application/octet-stream" });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
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

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    // Fixes "webkit blob resource error 1"
    setTimeout(function () {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 0);
  }
}

function initDlButton() {
  let dlButton = document.getElementById("download-button-2");

  let download = () => {
    // console.log('downloadingg');
    // downloadFile("dataaaa", "mewmewmew.csv");
    var responseHandler = function () {
      // console.log("response text", this.responseText);
      // let data = JSON.parse(this.responseText);
      let data = this.responseText;
      downloadFile(data, "club-details.csv");
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    var url = "http://127.0.0.1:3000/profiles/clubs/api";
    request.open("GET", url);

    // send the request
    request.send();
  };
  dlButton.addEventListener("click", download);
}

initDlButton();
