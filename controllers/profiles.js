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

  let showEditProfileForm = (request, response) => {
    let memberId = parseInt(request.params.id); 
    let cbGetData = (result) => {
      console.log(result);
      let data = {
        profile: result
      }
      response.render("./profiles/edit-profile", data)
    };
    db.profiles.getData(memberId, cbGetData);
  }

  let submitProfileEdits = (request, response) => {
    console.log(request.body);
    let memberId = parseInt(request.body.memberid);
    let memberTypeId = parseInt(request.body.membertypeid);
    let link = "/profiles/" + memberId;
    if (memberTypeId === 1) {
      let gender = request.body.gender;
      let dob = request.body.date_of_birth;
      let picture = request.body.picture_url;
      db.profiles.writeAthleteProfile(memberId, gender, dob, picture);
    } else if (memberTypeId === 2) {
      let website = request.body.club_website_url;
      let ig = request.body.club_ig_url;
      let fb = request.body.club_facebook_url;
      let picture = request.body.picture_url;
      db.profiles.writeClubProfile(memberId, website, ig, fb, picture);
    }
    response.redirect(link);
  }

  return {
    showProfile: showProfile,
    showEditProfileForm: showEditProfileForm,
    submitProfileEdits: submitProfileEdits
  };
  
};
