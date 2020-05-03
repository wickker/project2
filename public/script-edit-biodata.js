console.log("script edit biodata!");

let initialEmail;
let newEmail;

let emailInput = document.getElementById("email-input");

//Captures initial email 
function saveInitEmail(event) {
  initialEmail = event.target.value;
  console.log("init email: ", initialEmail);
  emailInput.removeEventListener("focus", saveInitEmail, false);
}

//Sends ajax request to check for email duplicates in server db
function veriEmailDuplicates(event) {
  newEmail = event.target.value;
  console.log("new email: ", newEmail);
  //Responds depending on whether an email duplicate is found 
  function responseHandler() {
    console.log(this.responseText);
    let responseText = this.responseText;
    if (responseText === "duplicate found") {
      let dupliDiv = document.getElementById("duplicate-email");
      dupliDiv.innerText = "";
      let errorMsg = document.createElement("p");
      errorMsg.textContent = "Email already exists. Please try again.";
      errorMsg.className = "text-danger";
      dupliDiv.appendChild(errorMsg);
      let editButton = document.getElementById("edit-member-button");
      //If a duplicate email is found, disable the submit form button
      editButton.disabled = true;
    } else {
      console.log("else case");
      let editButton = document.getElementById("edit-member-button");
      //If no duplicate email, enable the submit form button 
      editButton.disabled = false;
      let dupliDiv = document.getElementById("duplicate-email");
      dupliDiv.innerText = "";
    }
  }
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("POST", "/register/email");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //Only send ajax request if the edited email is not the same as the initial email
  if (initialEmail !== newEmail) {
    data = {
      inputEmail: newEmail,
    };
    request.send(JSON.stringify(data));
  } else {
    let editButton = document.getElementById("edit-member-button");
    //Enable the submit form button
    editButton.disabled = false;
    let dupliDiv = document.getElementById("duplicate-email");
    dupliDiv.innerText = "";
    return;
  }
}

//Shows password depending on checkbox
function togglePw() {
  console.log("toggle pw func");
  var x = document.getElementById("member-pw");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

let initOptions = () => {
  emailInput.addEventListener("focus", saveInitEmail);
  emailInput.addEventListener("blur", veriEmailDuplicates);
  let showPw = document.getElementById("show-pw-member");
  showPw.addEventListener("change", togglePw);
};

initOptions();
