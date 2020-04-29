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
          queryText = `select id, full_name from members where member_type_id = 2`;
          await pool.query(queryText).then(async (result) => {
            data.clubsArrOg = result.rows;
            if (data.profile.member_type_id === 1) {
              queryText = `select club_athlete.club_member_id, club_athlete.athlete_member_id, members.full_name from club_athlete join members on (members.id = club_athlete.club_member_id) where club_athlete.athlete_member_id = ${id}`;
            } else if (data.profile.member_type_id === 2) {
              queryText = `select club_athlete.club_member_id, club_athlete.athlete_member_id, members.full_name from club_athlete join members on (members.id = club_athlete.athlete_member_id) where club_athlete.club_member_id = ${id}`;
            }
            await pool.query(queryText).then(async (result) => {
              data.clubsOrAthArr = result.rows;
              cb(data);
            });
          });
        });
      });
    });
  };

  let writeDisciplines = async (discArr, memberId, response, link) => {
    let queryText = `delete from member_discipline where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows);
      if (discArr) {
        for (let i = 0; i < discArr.length; i++) {
          queryText = `insert into member_discipline (member_id, discipline_id) values (${memberId}, ${discArr[i]}) returning *`;
          await pool.query(queryText).then(async (result) => {
            console.log(result.rows);
          });
        }
      }
      response.redirect(link);
    });
  };

  let writeAthleteProfileAndClubAthletes = async (memberId, gender, dob, picture, discArr, response, link, clubsArr) => {
    let queryText = `update profiles set gender = '${gender}', dateofbirth = '${dob}', picture = '${picture}' where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      queryText = `delete from club_athlete where athlete_member_id = ${memberId} returning *`;
      await pool.query(queryText).then(async (result) => {
        if (clubsArr) {
          for (let i=0; i<clubsArr.length; i++) {
            queryText = `insert into club_athlete (club_member_id, athlete_member_id) values (${clubsArr[i]}, ${memberId}) returning *`;
            await pool.query(queryText).then(async (result) => {
              console.log(result.rows);
            });
          }
        }
        writeDisciplines(discArr, memberId, response, link);
      });
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
    writeAthleteProfileAndClubAthletes: writeAthleteProfileAndClubAthletes,
    writeClubProfile: writeClubProfile,
    writeDisciplines: writeDisciplines,
  };
};
