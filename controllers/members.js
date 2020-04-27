const sha256 = require("js-sha256");
const stripe = require("stripe")("sk_test_FmNttL0lkqXFZgzq2tjknhNB00qilakYCt");

module.exports = (db) => {
  let showHome = (request, response) => {
    response.render("home");
  };

  let showRegistrationForm = (request, response) => {
    let cbRegistrationForm = (result) => {
      let data = {
        memberTypeArr: result,
      };
      response.render("./auth/register", data);
    };
    db.members.registrationForm(cbRegistrationForm);
  };

  let showProfile = (request, response) => {
    response.send(request.body);
  };

  let makePayment = (request, response) => {
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
      picture
    );
    let cbPaymentDetails = async (result) => {
      let priceInCents = parseFloat(result.price) * 100;
      let nameString = result.type + " Membership";
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
          success_url:
            "http://127.0.0.1:3000/success?session_id={CHECKOUT_SESSION_ID}",
          cancel_url: "http://127.0.0.1:3000/register",
        });
        response.send(session);
      } catch (error) {
        console.log(error);
      }
    };
    db.members.paymentDetails(memberTypeId, cbPaymentDetails);
  };

  // let submitRegistrationForm = (request, response) => {
    // let fullName = request.body.full_name;
    // let password = sha256(request.body.password);
    // let email = request.body.email;
    // let address = request.body.street_address;
    // let unit = request.body.unit;
    // let postalCode = request.body.postal_code;
    // let memberTypeId = parseInt(request.body.membership_type_id);
    // let gender = request.body.gender;
    // let dob = Date.parse(request.body.date_of_birth);
    // let website = request.body.club_website_url;
    // let ig = request.body.club_ig_url;
    // let facebook = request.body.club_facebook_url;
    // let picture = request.body.picture_url;
    // let joinDate = Date.now();
    // db.members.writeToMembersAndProfile(
    //   fullName,
    //   password,
    //   email,
    //   address,
    //   unit,
    //   postalCode,
    //   memberTypeId,
    //   joinDate,
    //   gender,
    //   dob,
    //   website,
    //   ig,
    //   facebook,
    //   picture
    // );
  // };

  let showSuccess = (request, response) => {
    response.render("./auth/success");
  };

  return {
    showHome: showHome,
    showRegistrationForm: showRegistrationForm,
    showProfile: showProfile,
    // submitRegistrationForm: submitRegistrationForm,
    makePayment: makePayment,
    showSuccess: showSuccess,
    
  };
};
