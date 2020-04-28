const sha256 = require("js-sha256");
const stripe = require("stripe")("sk_test_FmNttL0lkqXFZgzq2tjknhNB00qilakYCt");

module.exports = (db) => {
  let showHome = (request, response) => {
    response.render("home");
  };

  //Display the membership registration form
  let showRegistrationForm = (request, response) => {
    let cbRegistrationForm = (result) => {
      let data = {
        memberTypeArr: result,
      };
      response.render("./auth/register", data);
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
    let cbPaymentDetails = async (result) => {
      console.log(result);
      let priceInCents = parseFloat(result.memberTypeDetails.price) * 100;
      let nameString = result.memberTypeDetails.type + " Membership";
      let successUrl =
        "http://127.0.0.1:3000/success?session_id={CHECKOUT_SESSION_ID}---" +
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
          cancel_url: "http://127.0.0.1:3000/register",
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

  let login = (request, response) => {
    console.log(request.body);
    let email = request.body.email;
    let password = request.body.password;
    let cbVerifyLogin = (result) => {
      if (result.length > 0) {
        let memberId = result[0].id;
        let memberName = result[0].full_name;
        response.cookie("memberid", memberId);
        response.cookie("loggedin", sha256("true"));
        let obj = {
          name: memberName
        };
        response.render("./auth/login-dashboard", obj);
      } else {
        let obj = {
          comments: "User not found. Please try again.",
        };
        response.render("home", obj);
      }
    };
    db.members.verifyLogin(email, password, cbVerifyLogin);
  };

  let showDashboard = (request, response) => {
    let memberId = parseInt(request.cookies.memberid);
    let cbPrintName = (result) => {
      let obj = {
        name: result.full_name
      };
      response.render("./auth/login-dashboard", obj);
    }
    db.members.printName(cbPrintName, memberId);
  }

  let logout = (request, response) => {
    let obj = {
      comments: "Logout success!",
    };
    response.clearCookie("memberid");
    response.clearCookie("loggedin");
    response.render("./auth/logout", obj);
  }

  let showPersonalParticulars = (request, response) => {
    let memberId = request.params.id;
    let cbDisplay = (result) => {
      console.log(result);
      let data = {
        personalData: result
      };
      response.render("./members/show-one-member", data);
    }
    db.members.printName(cbDisplay, memberId);
  }

  let showEditMemberForm = (request, response) => {
    let memberId = request.params.id; 
    let cbSendDataToForm = (result) => {
      console.log(result);
      let data = {
        memberData: result
      }
      response.render("./members/edit-member", data);
    }
    db.members.printName(cbSendDataToForm, memberId);
  }

  let submitEditedMember = (request, response) => {
    console.log(request.body);
    let name = request.body.full_name;
    let pw = request.body.password;
    let email = request.body.email;
    let unit = request.body.unit;
    let postcode = request.body.postal_code;
    let address = request.body.address;
    let memberId = parseInt(request.body.member_id);
    db.members.updateMember(memberId, name, pw, email, unit, postcode,address);
    let link = "/members/" + memberId;
    response.redirect(link);
  }

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
    submitEditedMember: submitEditedMember
  };
};
