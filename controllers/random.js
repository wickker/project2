module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let indexControllerCallback = (request, response) => {
      response.render('index')
  };

  let rollADieControllerCallback = (request, response) => {
    let params = request.params.id
    const maxNumber = parseInt(params)
    let numberToSend = Math.floor(Math.random() * maxNumber)

    let data = {
      number: numberToSend,
      maxNumber: maxNumber,
      someFluff: 'fluff',
      aThirdThing: 'yay'
    }

    // let dataToSend = JSON.stringify(data)

    response.send(data)
  }


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexControllerCallback,
    rolladie: rollADieControllerCallback,
  };

}
