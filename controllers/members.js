const sha256 = require("js-sha256");
const constants = require("constants");

//Requires stripe test payment key
const stripe = require("stripe")("sk_test_FmNttL0lkqXFZgzq2tjknhNB00qilakYCt");

module.exports = (db) => {
  //Display home page with club and athlete member statistics
  let showHome = (request, response) => {
    let cbGetClubMembersCount = (result) => {
      console.log(result);
      response.render("home", result[0]);
    };
    db.members.getClubMembersCount(cbGetClubMembersCount);
  };

  //Display the membership registration form
  let showRegistrationForm = (request, response) => {
    let cbRegistrationForm = (result) => {
      console.log(result);
      response.render("./auth/register", result);
    };
    db.members.registrationForm(cbRegistrationForm);
  };

  //Show the appropriate additional profile fields depending on the membership type selected
  let showProfile = (request, response) => {
    response.send(request.body);
  };

  //Write personal particulars and profile submission to tables, create stripe payment session send response
  let makePaymentAndSubmitRegistration = (request, response) => {
    console.log(request.body);
    let memberTypeId = parseInt(request.body.memberTypeId);
    let fullName = request.body.fullName;
    let password = request.body.password;
    let email = request.body.email;
    let address = request.body.address;
    let unit = request.body.unit;
    let postalCode = request.body.postalcode;
    let gender = request.body.gender;
    let dob = request.body.dob;
    let website = request.body.website;
    let ig = request.body.ig;
    let facebook = request.body.facebook;
    let picture = request.body.picture;
    let joinDate = Date.now();
    let discArr = request.body.disciplineArr;
    let clubsArr = request.body.clubsArr;
    //Create stripe check out session using membership details 
    let cbPaymentDetails = async (result) => {
      console.log(result);
      let priceInCents = parseFloat(result.memberTypeDetails.price) * 100;
      let nameString = result.memberTypeDetails.type + " Membership";
      //Adds unique member id to end of check out session id
      let successUrl =
        constants.baseUrl + "success?session_id={CHECKOUT_SESSION_ID}---" +
        result.memberId;
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              name: nameString,
              amount: priceInCents,
              currency: "sgd",
              quantity: 1,
            },
          ],
          success_url: successUrl,
          cancel_url: constants.baseUrl + "register"
        });
        response.send(session);
      } catch (error) {
        console.log(error);
      }
    };
    db.members.writeToMembersAndProfile(
      fullName,
      password,
      email,
      address,
      unit,
      postalCode,
      memberTypeId,
      joinDate,
      gender,
      dob,
      website,
      ig,
      facebook,
      picture,
      discArr,
      clubsArr,
      cbPaymentDetails
    );
  };

  //Display payment success page and trigger update of payment_session_id and payment status to members table
  let showSuccess = (request, response) => {
    console.log(request.query.session_id);
    let sessionId = request.query.session_id;
    let splitString = sessionId.split("---");
    sessionId = splitString[0];
    console.log("session id: ", sessionId);
    let memberId = parseInt(splitString[1]);
    console.log("member id: ", memberId);
    db.members.writePaymentId(sessionId, memberId);
    response.render("./auth/success");
  };

  //Processes login and creates cookies upon successful login
  let login = (request, response) => {
    console.log(request.body);
    let email = request.body.email;
    let password = request.body.password;
    let cbVerifyLogin = (result) => {
      if (result.length > 0) {
        let memberId = result[0].id;
        let memberName = result[0].full_name;
        //If admin account is used 
        if (memberName === "Admin") {
          response.cookie("admin", sha256("true"));
        }
        //If regular member account is used 
        response.cookie("memberid", memberId);
        response.cookie("loggedin", sha256("true"));
        let obj = {
          name: memberName,
        };
        response.render("./auth/login-dashboard", obj);
      } else {
        //If no matches found for member email and password
        let obj = {
          comments: "User not found. Please try again.",
        };
        let cbGetClubMembersCount = (result) => {
          //Display member statistics while rendering login error message
          obj.athletes = result[0].athletes;
          obj.clubs = result[0].clubs;
          response.render("home", obj);
        };
        db.members.getClubMembersCount(cbGetClubMembersCount);
      }
    };
    db.members.verifyLogin(email, password, cbVerifyLogin);
  };

  //Displays "hello" message upon successful login
  let showDashboard = (request, response) => {
    let memberId = parseInt(request.cookies.memberid);
    let cbPrintName = (result) => {
      let obj = {
        name: result.full_name,
      };
      response.render("./auth/login-dashboard", obj);
    };
    db.members.printName(cbPrintName, memberId);
  };

  //Logout and clears login cookies 
  let logout = (request, response) => {
    let obj = {
      comments: "Logout success!",
    };
    response.clearCookie("memberid");
    response.clearCookie("loggedin");
    response.clearCookie("admin");
    response.render("./auth/logout", obj);
  };
  
  //Displays member biodata page
  let showPersonalParticulars = (request, response) => {
    let memberId = request.params.id;
    let cbDisplay = (result) => {
      console.log(result);
      let data = {
        personalData: result,
      };
      response.render("./members/show-one-member", data);
    };
    db.members.printName(cbDisplay, memberId);
  };

  //Displays edit biodata page
  let showEditMemberForm = (request, response) => {
    let memberId = request.params.id;
    let cbSendDataToForm = (result) => {
      console.log(result);
      let data = {
        memberData: result,
      };
      response.render("./members/edit-member", data);
    };
    db.members.printName(cbSendDataToForm, memberId);
  };

  //Submits edited biodata
  let submitEditedMember = (request, response) => {
    console.log(request.body);
    let name = request.body.full_name;
    let pw = request.body.password;
    let email = request.body.email;
    let unit = request.body.unit;
    let postcode = request.body.postal_code;
    let address = request.body.address;
    let memberId = parseInt(request.body.member_id);
    db.members.updateMember(memberId, name, pw, email, unit, postcode, address);
    let link = "/members/" + memberId;
    response.redirect(link);
  };

  //Handles ajax request for subsequent payment if member did not pay initially
  let makeSubsPayment = (request, response) => {
    console.log(request.body);
    let memberTypeId = parseInt(request.body.memberType);
    let memberId = parseInt(request.body.memberId);
    //Create new payment session 
    let cbPaymentDetails = async (result) => {
      console.log(result);
      let priceInCents = parseFloat(result.price) * 100;
      let nameString = result.type + " Membership";
      let successUrl =
        constants.baseUrl + "success?session_id={CHECKOUT_SESSION_ID}---" +
        memberId;
      let cancelUrl = constants.baseUrl + "members/" + memberId;
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              name: nameString,
              amount: priceInCents,
              currency: "sgd",
              quantity: 1,
            },
          ],
          success_url: successUrl,
          //Cancel url is biodata page
          cancel_url: cancelUrl,
        });
        response.send(session);
      } catch (error) {
        console.log(error);
      }
    };
    db.members.paymentDetails(memberTypeId, cbPaymentDetails);
  };

  //Checks for duplicate email in database via ajax during registration and biodata edit
  let checkEmail = (request, response) => {
    let inputEmail = request.body.inputEmail;
    let cbRetrieveEmail = (result) => {
      if (result.length > 0) {
        response.send("duplicate found");
      } else {
        response.send("no duplicate");
      }
    };
    db.members.retrieveEmail(cbRetrieveEmail, inputEmail);
  };

  return {
    showHome: showHome,
    showRegistrationForm: showRegistrationForm,
    showProfile: showProfile,
    makePaymentAndSubmitRegistration: makePaymentAndSubmitRegistration,
    showSuccess: showSuccess,
    login: login,
    showDashboard: showDashboard,
    logout: logout,
    showPersonalParticulars: showPersonalParticulars,
    showEditMemberForm: showEditMemberForm,
    submitEditedMember: submitEditedMember,
    makeSubsPayment: makeSubsPayment,
    checkEmail: checkEmail,
  };
};
