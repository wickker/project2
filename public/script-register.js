console.log("script register!");

let showRelProfile = (event) => {
  var request = new XMLHttpRequest();
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

  request.addEventListener("load", responseHandler);

  request.open("POST", "/register/new");

  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  console.log(event.target.value);
  let data = { memberTypeId: event.target.value };
  request.send(JSON.stringify(data));
};

let initOptions = () => {
  let option = document.getElementById("member-type");
  console.log(option);
  option.addEventListener("change", showRelProfile);
};

initOptions();

function showAthleteForm() {
  let showProf = document.getElementById("show-prof");
  showProf.innerHTML = "";

  let genderSelect = document.createElement("select");
  let genderOptF = document.createElement("option");
  let genderOptM = document.createElement("option");
  let optBlank = document.createElement("option");
  let break1 = document.createElement("br");
  let break2 = document.createElement("br");
  let break3 = document.createElement("br");
  let dpInput = document.createElement("input");
  let dobInput = document.createElement("input");
  let dobText = document.createElement("h6");
  let title = document.createElement("h5");

  optBlank.value = "";
  optBlank.setAttribute("disabled", true);
  optBlank.setAttribute("selected", true);
  optBlank.innerText = "Select Gender";
  genderOptF.innerText = "Female";
  genderOptF.value = "Female";
  genderOptM.innerText = "Male";
  genderOptM.value = "Female";
  genderSelect.setAttribute("required", true);
  genderSelect.name = "gender";
  genderSelect.className = "custom-select";
  genderSelect.add(optBlank, 0);
  genderSelect.add(genderOptF, 1);
  genderSelect.add(genderOptM, 2);

  dpInput.name = "dp";
  dpInput.className = "form-control";
  dpInput.placeholder = "Display Picture URL";
  dpInput.type = "text";
  
  dobInput.type = "date";
  dobInput.className = "form-control";
  dobInput.classList.add("form-control");
  dobInput.classList.add("date_input");

  dobText.innerText = "Date of Birth:";
  dobText.className = "mb-1";

  title.innerText = "Additional Fields";
  title.className = "mb-3";

  showProf.appendChild(title);
  showProf.appendChild(genderSelect);
  showProf.appendChild(break1);
  showProf.appendChild(break2);
  showProf.appendChild(dobText);
  showProf.appendChild(dobInput);
  showProf.appendChild(break3);
  showProf.appendChild(dpInput);
}

function showClubForm() {
  let showProf = document.getElementById("show-prof");
  showProf.innerHTML = "";

  let title = document.createElement("h5");
  title.innerText = "Additional Fields";
  title.className = "mb-3";
  
  let logoInput = document.createElement("input");
  logoInput.name = "logo";
  logoInput.className = "form-control";
  logoInput.placeholder = "Club Logo URL";
  logoInput.type = "text";
 
  showProf.appendChild(title);
  showProf.appendChild(logoInput);
}