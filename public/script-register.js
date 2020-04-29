console.log("script register!");

//To display file name in image upload input field
bsCustomFileInput.init();

//Stripe
var stripe = Stripe("pk_test_pckFflMIjCBNmdMoSjuXBhpA00Gd0QrvhH");

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

let showRelevantProfile = (event) => {
  function responseHandler() {
    let responseObject = JSON.parse(this.responseText);
    console.log(responseObject);
    let memberTypeId = parseInt(responseObject.memberTypeId);
    let profileArr = document.getElementsByClassName("profile");
    let athleteArr = document.getElementsByClassName("athlete");
    let clubArr = document.getElementsByClassName("club");
    let compulsoryArr = document.getElementsByClassName("compulsory");
    if (memberTypeId === 1) {
      for (let i = 0; i < profileArr.length; i++) {
        profileArr[i].hidden = true;
      }
      for (let z = 0; z < athleteArr.length; z++) {
        athleteArr[z].hidden = false;
      }
      for (let x = 0; x < compulsoryArr.length; x++) {
        compulsoryArr[x].required = true;
      }
    } else if (memberTypeId === 2) {
      for (let i = 0; i < profileArr.length; i++) {
        profileArr[i].hidden = true;
      }
      for (let z = 0; z < clubArr.length; z++) {
        clubArr[z].hidden = false;
      }
      for (let x = 0; x < compulsoryArr.length; x++) {
        compulsoryArr[x].required = false;
      }
    }
  }
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("POST", "/register/new");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let memberTypeIdObj = { memberTypeId: event.target.value };
  request.send(JSON.stringify(memberTypeIdObj));
};

let payment = (event) => {
  event.preventDefault();
  function responseHandler() {
    let responseObject = JSON.parse(this.responseText);
    console.log(responseObject);
    let checkOutSessionId = responseObject.id;
    stripe
      .redirectToCheckout({
        sessionId: checkOutSessionId,
      })
      .then(function (result) {
        if (result.error) {
          console.log(result.error.message);
        }
      });
  }
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("POST", "/register/payment");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let formObj = {};
  formObj.memberTypeId = document.getElementById("member-type").value;
  formObj.fullName = document.getElementById("full_name").value;
  formObj.password = document.getElementById("password").value;
  formObj.email = document.getElementById("email").value;
  formObj.address = document.getElementById("street_address").value;
  formObj.unit = document.getElementById("unit").value;
  formObj.postalcode = document.getElementById("postal_code").value;
  formObj.gender = document.getElementById("gender").value;
  formObj.dob = document.getElementById("date_of_birth").value;
  formObj.website = document.getElementById("club_website_url").value;
  formObj.facebook = document.getElementById("club_facebook_url").value;
  formObj.ig = document.getElementById("club_ig_url").value;
  formObj.picture = document.getElementById("picture_url").value;
  formObj.disciplineArr = [];
  let disciplineArr2 = document.getElementsByClassName("form-check-input-disc");
  console.log(disciplineArr2);
  for (let i = 0; i < disciplineArr2.length; i++) {
    if (disciplineArr2[i].checked) {
      formObj.disciplineArr.push(parseInt(disciplineArr2[i].value));
    }
  }
  console.log(formObj.disciplineArr);

  formObj.clubsArr = [];
  let clubsArr2 = document.getElementsByClassName("form-check-input-club");
  for (let i = 0; i < clubsArr2.length; i++) {
    if (clubsArr2[i].checked) {
      formObj.clubsArr.push(parseInt(clubsArr2[i].value));
    }
  }
  request.send(JSON.stringify(formObj));
};

let initOptions = () => {
  let memberTypeSelect = document.getElementById("member-type");
  memberTypeSelect.addEventListener("change", showRelevantProfile);
  let uploadButton = document.getElementById("picture_upload_button");
  uploadButton.addEventListener("click", uploadImage);
  let submitAndPayButton = document.getElementById("registration-form");
  submitAndPayButton.addEventListener("submit", payment);
};

initOptions();
