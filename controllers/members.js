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
      console.log(data);
      response.render("./auth/register", data);
    };
    db.members.registrationForm(cbRegistrationForm);
  };

  let showProfile = (request, response) => {
    response.send(request.body);
  };

  let submitRegistrationForm = (request, response) => {
    console.log(request.body);
  };

  let payment = (request, response) => {
    console.log(request.body);
    let memberTypeId = parseInt(request.body.memberTypeId);
    let cbPaymentDetails = async (result) => {
      console.log(result);
      let price = parseFloat(result.price);
      console.log(price);
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              name: result.type,
              amount: 10000,
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

  return {
    showHome: showHome,
    showRegistrationForm: showRegistrationForm,
    showProfile: showProfile,
    submitRegistrationForm: submitRegistrationForm,
    payment: payment,
  };
};
