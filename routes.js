module.exports = (app, allModels) => {
  //Require the controller
  const membersController = require("./controllers/members")(allModels);
  const athletesController = require("./controllers/athletes")(allModels);
  const clubsController = require("./controllers/clubs")(allModels);

  app.get("/", membersController.showHome);

  app.get("/register", membersController.showRegistrationForm);

  app.post("/register/new", membersController.showProfile);
};
