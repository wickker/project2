console.log("script edit biodata!");

let initialEmail;
let newEmail;

let emailInput = document.getElementById("email-input");

function saveInitEmail(event) {
  initialEmail = event.target.value;
  console.log("init email: ", initialEmail);
  emailInput.removeEventListener("focus", saveInitEmail, false);
}

function veriEmailDuplicates(event) {
  newEmail = event.target.value;
  console.log("new email: ", newEmail);

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
      editButton.disabled = true;
    } else {
      console.log("else case");
      let editButton = document.getElementById("edit-member-button");
      editButton.disabled = false;
      let dupliDiv = document.getElementById("duplicate-email");
      dupliDiv.innerText = "";
    }
  }
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("POST", "/register/email");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  if (initialEmail !== newEmail) {
    data = {
      inputEmail: newEmail,
    };
    request.send(JSON.stringify(data));
  } else {
    let editButton = document.getElementById("edit-member-button");
    editButton.disabled = false;
    let dupliDiv = document.getElementById("duplicate-email");
    dupliDiv.innerText = "";
    return;
  }
}

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
