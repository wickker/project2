module.exports = (db) => {
  let showProfile = (request, response) => {
    let memberId = parseInt(request.params.id);
    let cbGetData = (result) => {
      console.log(result);
      response.render("./profiles/show-one-profile", result);
    };
    db.profiles.getData(memberId, cbGetData);
  };

  let showEditProfileForm = (request, response) => {
    let memberId = parseInt(request.params.id);
    let cbGetData = (result) => {
      console.log(result);
      response.render("./profiles/edit-profile", result);
    };
    db.profiles.getData(memberId, cbGetData);
  };

  let submitProfileEdits = (request, response) => {
    console.log(request.body);
    let memberId = parseInt(request.body.memberid);
    let memberTypeId = parseInt(request.body.membertypeid);
    let link = "/profiles/" + memberId;
    let discArr = request.body.discipline;
    let clubsArr = request.body.clubs;
    if (memberTypeId === 1) {
      let gender = request.body.gender;
      let dob = request.body.date_of_birth;
      let picture = request.body.picture_url;
      db.profiles.writeAthleteProfileAndClubAthletes(memberId, gender, dob, picture, discArr, response, link, clubsArr);
    } else if (memberTypeId === 2) {
      let website = request.body.club_website_url;
      let ig = request.body.club_ig_url;
      let fb = request.body.club_facebook_url;
      let picture = request.body.picture_url;
      db.profiles.writeClubProfile(memberId, website, ig, fb, picture, discArr, response, link);
    }
  };

  let showAllClubProfiles = (request, response) => {
    let cbGetClubData = (result) => {
      console.log(result);
      response.render("./profiles/show-all-club-profiles", result);
    }
    db.profiles.getClubData(cbGetClubData);
  }

  let showAllAthleteProfiles = (request, response) => {
    let cbGetAthleteData = (result) => {
      console.log(result);
      response.render("./profiles/show-all-athlete-profiles", result);
    }
    db.profiles.getAthleteData(cbGetAthleteData);
  }

  let getDiscipline = (request, response) => {
    let discId = parseInt(request.params.id); 
    let cbGetDiscData = (result) => {
      let data = {
        dataArr: result
      };
      console.log(data);
      response.render("./profiles/disc-sort", data);
    }
    db.profiles.getDiscData(discId, cbGetDiscData);
  }

  let tableByDisc = (request, response) => {
    let cbGetTableByDisc = (result) => {
      console.log(result);
      response.render("./profiles/discipline", result);
    }
    db.profiles.getTableByDisc(cbGetTableByDisc);
  }
 
  return {
    showProfile: showProfile,
    showEditProfileForm: showEditProfileForm,
    submitProfileEdits: submitProfileEdits,
    showAllClubProfiles: showAllClubProfiles,
    showAllAthleteProfiles: showAllAthleteProfiles,
    getDiscipline: getDiscipline,
    tableByDisc: tableByDisc
  };
};
