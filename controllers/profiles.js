module.exports = (db) => {

  let showProfile = (request, response) => {
    let memberId = parseInt(request.params.id); 
    let cbGetData = (result) => {
      console.log(result);
      let data = {
        profile: result
      }
      response.render("./profiles/show-one-profile", data)
    };
    db.profiles.getData(memberId, cbGetData);
  };

  return {
    showProfile: showProfile
  };
  
};
