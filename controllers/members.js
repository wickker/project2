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

  return {
    showHome: showHome,
    showRegistrationForm: showRegistrationForm,
    showProfile: showProfile,
  };
};
