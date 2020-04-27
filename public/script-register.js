console.log("script register!");
//To display file name in image upload input field
bsCustomFileInput.init();
var stripe = Stripe('pk_test_pckFflMIjCBNmdMoSjuXBhpA00Gd0QrvhH');

//Cloudinary constants
const cloudinary_url = "https://api.cloudinary.com/v1_1/dwoimiuph/image/upload";
const cloudinary_upload_preset = "wh3xm7xt";

// let uploadImageToCloudinary = (inputULId, previewId, valueSubmitId) => {
//   function responseHandler() {
//     console.log("response text: ", this.responseText);
//     let resObj = JSON.parse(this.responseText);
//     let newImgUrl = resObj.secure_url;
//     let imgPreview = document.getElementById(previewId);
//     imgPreview.src = newImgUrl;
//     let submittedUrl = document.getElementById(valueSubmitId);
//     submittedUrl.value = newImgUrl;
//   }
//   var request = new XMLHttpRequest();
//   let fileUpload = document.getElementById(inputULId);
//   let file = fileUpload.files[0];
//   request.addEventListener("load", responseHandler);
//   request.open("POST", cloudinary_url, true);
//   request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//   let formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", cloudinary_upload_preset);
//   request.send(formData);
// };

// let uploadImageDp = (event) => {
//   let inputULId = "dp-input";
//   let previewId = "img-preview-dp";
//   let valueSubmitId = "dp_url";
//   uploadImageToCloudinary(inputULId, previewId, valueSubmitId);
// };

// let uploadImageLogo = (event) => {
//   let inputULId = "logo-input";
//   let previewId = "img-preview-logo";
//   let valueSubmitId = "logo_url";
//   uploadImageToCloudinary(inputULId, previewId, valueSubmitId);
// };

// let showRelProfile = (event) => {
//   function responseHandler() {
//     console.log("response text: ", this.responseText);
//     let responseObj = JSON.parse(this.responseText);
//     console.log(responseObj);
//     let memberTypeId = parseInt(responseObj.memberTypeId);
//     let athleteDiv = document.getElementById("athlete-add-fields");
//     let clubDiv = document.getElementById("club-add-fields");
//     if (memberTypeId === 1) {
//       clubDiv.hidden = true;
//       athleteDiv.hidden = false;
//     } else if (memberTypeId === 2) {
//       athleteDiv.hidden = true;
//       clubDiv.hidden = false;
//     }
//   }
//   var request = new XMLHttpRequest();
//   request.addEventListener("load", responseHandler);
//   request.open("POST", "/register/new");
//   request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   console.log(event.target.value);
//   let data = { memberTypeId: event.target.value };
//   request.send(JSON.stringify(data));
// };

let payment = (event) => {
  function responseHandler() {
    console.log("response text: ", this.responseText);
    let responseObj = JSON.parse(this.responseText);
    console.log(responseObj);
    let checkOutSessionId = responseObj.id;
    stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkOutSessionId,
    }).then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      if (result.error) {
        console.log(result.error.message);
      }
    });

    
  }
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("POST", "/register/payment");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let data = { memberTypeId: event.target.value };
  request.send(JSON.stringify(data));
};


let initOptions = () => {
  let option = document.getElementById("member-type");
  option.addEventListener("change", payment);
  // option.addEventListener("change", showRelProfile);
  // let uploadButtonLogo = document.getElementById("logo-but");
  // let uploadButtonDp = document.getElementById("dp-but");
  // uploadButtonDp.addEventListener("click", uploadImageDp);
  // uploadButtonLogo.addEventListener("click", uploadImageLogo);
};

initOptions();
