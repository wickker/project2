module.exports = (app, allModels) => {
  //Require the controller
  const membersController = require("./controllers/members")(allModels);
  const profilesController = require("./controllers/profiles")(allModels);

  //Routes
  app.get("/", membersController.showHome);

  app.post("/", membersController.login);

  app.get("/register", membersController.showRegistrationForm);

  app.post("/register/new", membersController.showProfile);

  app.post("/register/email", membersController.checkEmail);

  app.post("/register/payment", membersController.makePaymentAndSubmitRegistration);

  app.get("/logout", membersController.logout);

  app.get("/success", membersController.showSuccess);

  app.get("/members", membersController.showDashboard);

  app.post("/members/payment", membersController.makeSubsPayment);

  app.get("/members/:id/edit", membersController.showEditMemberForm);

  app.post("/members/:id/edit", membersController.submitEditedMember);
  
  app.get("/members/:id", membersController.showPersonalParticulars);

  app.get("/profiles/clubs", profilesController.showAllClubProfiles);

  app.get("/profiles/clubs/api", profilesController.sendClubData);

  app.get("/profiles/athletes", profilesController.showAllAthleteProfiles);

  app.get("/profiles/athletes/api", profilesController.sendAthleteData);

  app.get("/profiles/:id/edit", profilesController.showEditProfileForm);

  app.post("/profiles/:id/edit", profilesController.submitProfileEdits);
  
  app.get("/profiles/:id", profilesController.showProfile);

  app.get("/discipline", profilesController.tableByDisc);

  app.get("/discipline/:id", profilesController.getDiscipline);
};
