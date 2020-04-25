module.exports = (db) => {

  let showHome = (request, response) => {
    response.render('home');
  };

  return {
    showHome: showHome
  };

};
