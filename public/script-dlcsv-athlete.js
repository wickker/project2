console.log("script dl csv athlete!");

//Imported function from module to download csv files
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

//Initialize csv download button 
function initDlButton() {
  let dlButton = document.getElementById("download-button");
  //Callback function 
  let download = () => {
    var responseHandler = function () {
      //responseText data has been parsed to csv on server side 
      let data = this.responseText;
      downloadFile(data, "athlete-details.csv");
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "https://gentle-castle-21661.herokuapp.com/profiles/athletes/api";
    request.open("GET", url);
    //Gets parsed csv data from ajax api
    request.send();
  };
  dlButton.addEventListener("click", download);
}

initDlButton();
