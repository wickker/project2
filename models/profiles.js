module.exports = (pool) => {
  let getData = (id, cb) => {
    let queryText = `select profiles.member_id, profiles.member_type_id, profiles.picture, profiles.dateofbirth, profiles.gender, profiles.club_website_url, profiles.club_ig_url, profiles.club_facebook_url, members.full_name from profiles join members on (members.id = profiles.member_id) where profiles.member_id = ${id}`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows[0]);
      }
    });
  };

  let writeAthleteProfile = (memberId, gender, dob, picture) => {
    let queryText = `update profiles set gender = '${gender}', dateofbirth = '${dob}', picture = '${picture}' where member_id = ${memberId} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows[0]);
      }
    });
  };

  let writeClubProfile = (memberId, website, ig, fb, picture) => {
    let queryText = `update profiles set club_website_url = '${website}', club_ig_url = '${ig}', club_facebook_url = '${fb}', picture = '${picture}' where member_id = ${memberId} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows[0]);
      }
    });
  }

  return {
    getData: getData,
    writeAthleteProfile: writeAthleteProfile,
    writeClubProfile: writeClubProfile
  };
};
