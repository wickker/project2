module.exports = (app, allModels) => {
  //Require the controller
  const membersController = require("./controllers/members")(allModels);
  const profilesController = require("./controllers/profiles")(allModels);

  app.get("/", membersController.showHome);

  app.post("/", membersController.login);

  app.get("/register", membersController.showRegistrationForm);

  app.post("/register/new", membersController.showProfile);

  app.post("/register/payment", membersController.makePaymentAndSubmitRegistration);

  app.get("/logout", membersController.logout);

  app.get("/success", membersController.showSuccess);

  app.get("/members", membersController.showDashboard);

  app.get("/members/:id", membersController.showPersonalParticulars);

  app.get("/profiles/:id", profilesController.showProfile);
};
