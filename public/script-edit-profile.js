console.log("script edit profile!");

//To display file name in image upload input field
bsCustomFileInput.init();

//Cloudinary constants
const cloudinary_url = "https://api.cloudinary.com/v1_1/dwoimiuph/image/upload";
const cloudinary_upload_preset = "wh3xm7xt";

let uploadImage = (event) => {
  function responseHandler() {
    let responseObject = JSON.parse(this.responseText);
    console.log(responseObject);
    let uploadedImageURL = responseObject.secure_url;
    let imagePreview = document.getElementById("picture-preview");
    imagePreview.src = uploadedImageURL;
    let imageURLInput = document.getElementById("picture_url");
    imageURLInput.value = uploadedImageURL;
  }
  var request = new XMLHttpRequest();
  let fileUploaded = document.getElementById("picture-input");
  let file = fileUploaded.files[0];
  request.addEventListener("load", responseHandler);
  request.open("POST", cloudinary_url, true);
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinary_upload_preset);
  request.send(formData);
};

let initOptions = () => {
  let uploadButton = document.getElementById("picture_upload_button");
  uploadButton.addEventListener("click", uploadImage);
};

initOptions();
