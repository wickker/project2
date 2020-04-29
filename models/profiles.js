module.exports = (pool) => {
  let getData = async (id, cb) => {
    let queryText = `select profiles.member_id, profiles.member_type_id, profiles.picture, profiles.dateofbirth, profiles.gender, profiles.club_website_url, profiles.club_ig_url, profiles.club_facebook_url, members.full_name from profiles join members on (members.id = profiles.member_id) where profiles.member_id = ${id}`;
    await pool.query(queryText).then(async (result) => {
      let data = {
        profile: result.rows[0],
      };
      queryText = `select member_discipline.member_id, member_discipline.discipline_id, discipline.type from member_discipline join discipline on (member_discipline.discipline_id = discipline.id) where member_discipline.member_id = ${id}`;
      await pool.query(queryText).then(async (result) => {
        data.disciplineArr = result.rows;
        queryText = `select * from discipline`;
        await pool.query(queryText).then(async (result) => {
          data.disciplineArrOg = result.rows;
          cb(data);
        });
      });
    });
  };

  let writeDisciplines = async (discArr, memberId, response, link) => {
    let queryText = `delete from member_discipline where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows);
      for (let i = 0; i < discArr.length; i++) {
        queryText = `insert into member_discipline (member_id, discipline_id) values (${memberId}, ${discArr[i]}) returning *`;
        await pool.query(queryText).then(async (result) => {
          console.log(result.rows);
        });
      }
      response.redirect(link);
    });
  };

  let writeAthleteProfile = async (memberId, gender, dob, picture, discArr, response, link) => {
    let queryText = `update profiles set gender = '${gender}', dateofbirth = '${dob}', picture = '${picture}' where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      writeDisciplines(discArr, memberId, response, link);
    });
  };

  let writeClubProfile = async (memberId, website, ig, fb, picture, discArr, response, link) => {
    let queryText = `update profiles set club_website_url = '${website}', club_ig_url = '${ig}', club_facebook_url = '${fb}', picture = '${picture}' where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      writeDisciplines(discArr, memberId, response, link);
    });
  };

  return {
    getData: getData,
    writeAthleteProfile: writeAthleteProfile,
    writeClubProfile: writeClubProfile,
    writeDisciplines: writeDisciplines,
  };
};
