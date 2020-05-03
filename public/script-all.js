console.log("script all!");

//Get cookie value depending on name argument, returns "" if cookie name cannot be found 
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Modifies the navigation bar display depending on whether a member or the admin is logged in
function checkLogins() {
  let memberIdCookie = getCookie("memberid");
  let adminCookie = getCookie("admin");
  //Elements only admins should see
  let adminHtmlArr = document.getElementsByClassName("whenadmin");
  //All elements in the navigation bar
  let varHtmlArr = document.getElementsByClassName("var");
  //Elements only regular members should see
  let memberHtmlArr = document.getElementsByClassName("whenmember");
  //Elements only the public should see
  let publicHtmlArr = document.getElementsByClassName("whenpublic");
  if (memberIdCookie && memberIdCookie !== "") {
    //When admin is logged in
    document.getElementById("home-logo").removeAttribute("href");
    if (adminCookie && adminCookie !== "") {
      for (let x = 0; x < varHtmlArr.length; x++) {
        varHtmlArr[x].hidden = true;
      }
      for (let i = 0; i < adminHtmlArr.length; i++) {
        adminHtmlArr[i].hidden = false;
      }
      document.getElementById("admin-mode-text").textContent = "Admin Mode";
      //When a regular member is logged in
    } else {
      for (let x = 0; x < varHtmlArr.length; x++) {
        varHtmlArr[x].hidden = true;
      }
      for (let i = 0; i < memberHtmlArr.length; i++) {
        memberHtmlArr[i].hidden = false;
      }
      document.getElementById("mybio").href = "/members/" + memberIdCookie;
      document.getElementById("myprofile").href = "/profiles/" + memberIdCookie;
      document.getElementById("editbio").href =
        "/members/" + memberIdCookie + "/edit";
      document.getElementById("editprofile").href =
        "/profiles/" + memberIdCookie + "/edit";
    }
    //When the page is accessible to the public
  } else {
    document.getElementById("home-logo").href = "/";
    for (let x = 0; x < varHtmlArr.length; x++) {
      varHtmlArr[x].hidden = true;
    }
    for (let i = 0; i < publicHtmlArr.length; i++) {
      publicHtmlArr[i].hidden = false;
    }
    let affiAthletesDiv = document.getElementsByClassName("affi-athletes");
    for (let z = 0; z < affiAthletesDiv.length; z++) {
      affiAthletesDiv[z].hidden = true;
    }
  }
}

checkLogins();
