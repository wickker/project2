module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let indexControllerCallback = (request, response) => {
      response.render('index')
  };


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexControllerCallback,
  };

}
