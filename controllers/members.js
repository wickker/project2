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
    let password = sha256(request.body.password);
    let email = request.body.email;
    let address = request.body.address;
    let unit = request.body.unit;
    let postalCode = request.body.postalcode;
    let gender = request.body.gender;
    let dob = Date.parse(request.body.dob);
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

  }

  return {
    showHome: showHome,
    showRegistrationForm: showRegistrationForm,
    showProfile: showProfile,
    makePaymentAndSubmitRegistration: makePaymentAndSubmitRegistration,
    showSuccess: showSuccess,
    login: login
  };
};
