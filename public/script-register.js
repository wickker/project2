bsCustomFileInput.init();

const cloudinary_url = "https://api.cloudinary.com/v1_1/dwoimiuph/image/upload";
const cloudinary_upload_preset = "wh3xm7xt";

console.log("script register!");

let uploadImageToCloudinary = (inputULId, previewId, valueSubmitId) => {
  function responseHandler() {
    console.log("response text: ", this.responseText);
    let resObj = JSON.parse(this.responseText);
    let newImgUrl = resObj.secure_url;
    let imgPreview = document.getElementById(previewId);
    imgPreview.src = newImgUrl;
    let submittedUrl = document.getElementById(valueSubmitId);
    submittedUrl.value = newImgUrl;
  }
  var request = new XMLHttpRequest();
  let fileUpload = document.getElementById(inputULId);
  let file = fileUpload.files[0];
  request.addEventListener("load", responseHandler);
  request.open("POST", cloudinary_url, true);
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinary_upload_preset);
  request.send(formData);
};

let uploadImageDp = (event) => {
  let inputULId = "dp-input";
  let previewId = "img-preview-dp";
  let valueSubmitId = "dp_url";
  uploadImageToCloudinary(inputULId, previewId, valueSubmitId);
};

let uploadImageLogo = (event) => {
  let inputULId = "logo-input";
  let previewId = "img-preview-logo";
  let valueSubmitId = "logo_url";
  uploadImageToCloudinary(inputULId, previewId, valueSubmitId);
};

let showRelProfile = (event) => {
  function responseHandler() {
    console.log("response text: ", this.responseText);
    let responseObj = JSON.parse(this.responseText);
    console.log(responseObj);
    let memberTypeId = parseInt(responseObj.memberTypeId);
    if (memberTypeId === 1) {
      showAthleteForm();
    } else if (memberTypeId === 2) {
      showClubForm();
    }
  }
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("POST", "/register/new");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  console.log(event.target.value);
  let data = { memberTypeId: event.target.value };
  request.send(JSON.stringify(data));
};

let initOptions = () => {
  let option = document.getElementById("member-type");
  option.addEventListener("change", showRelProfile);
  let uploadButtonLogo = document.getElementById("logo-but");
  let uploadButtonDp = document.getElementById("dp-but");
  uploadButtonDp.addEventListener("click", uploadImageDp);
  uploadButtonLogo.addEventListener("click", uploadImageLogo);
};

initOptions();
