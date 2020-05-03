console.log("script one member!");

//Stripe
var stripe = Stripe("pk_test_pckFflMIjCBNmdMoSjuXBhpA00Gd0QrvhH");

//Cloudinary constants
const cloudinary_url = "https://api.cloudinary.com/v1_1/dwoimiuph/image/upload";
const cloudinary_upload_preset = "wh3xm7xt";

let payment = (event) => {
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
  request.open("POST", "/members/payment");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let memberType = event.target.getAttribute("memberTypeId");
  let memberId = event.target.getAttribute("memberId");
  let formObj = {
    memberType: memberType,
    memberId: memberId
  };
  request.send(JSON.stringify(formObj));
};

let initOptions = () => {
  let button = document.getElementById("pay-now");
  if (button) {
    button.addEventListener("click", payment);
  }
};

initOptions();
