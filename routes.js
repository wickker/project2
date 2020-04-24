module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const randomNumberControllerCallbacks = require('./controllers/random')(allModels);

  app.get('/', randomNumberControllerCallbacks.index)

  app.get('/random/:id', randomNumberControllerCallbacks.rolladie)

};
