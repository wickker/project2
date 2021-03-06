module.exports = (pool) => {
  //Get all possible data on a member
  let getData = async (id, cb) => {
    let queryText = `select profiles.member_id, profiles.member_type_id, profiles.picture, profiles.dateofbirth, profiles.gender, profiles.club_website_url, profiles.club_ig_url, profiles.club_facebook_url, members.full_name from profiles join members on (members.id = profiles.member_id) where profiles.member_id = ${id}`;
    //Get all profiles and members data based on a certain member id
    await pool.query(queryText).then(async (result) => {
      let data = {
        profile: result.rows[0],
      };
      queryText = `select member_discipline.member_id, member_discipline.discipline_id, discipline.type from member_discipline join discipline on (member_discipline.discipline_id = discipline.id) where member_discipline.member_id = ${id}`;
      //Get all disciplines a member is affiliated to
      await pool.query(queryText).then(async (result) => {
        data.disciplineArr = result.rows;
        queryText = `select * from discipline`;
        //Get all possible disciplines a member can be affiliated to
        await pool.query(queryText).then(async (result) => {
          data.disciplineArrOg = result.rows;
          queryText = `select id, full_name from members where member_type_id = 2`;
          //Get all clubs a member could possibly be affiliated to
          await pool.query(queryText).then(async (result) => {
            data.clubsArrOg = result.rows;
            //if the member in question is an athlete member, get all previously affiliated clubs
            if (data.profile.member_type_id === 1) {
              queryText = `select club_athlete.club_member_id, club_athlete.athlete_member_id, members.full_name from club_athlete join members on (members.id = club_athlete.club_member_id) where club_athlete.athlete_member_id = ${id}`;
              //If the member in question is a club member, get all previously affiliated athletes
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

  //If a member has selected affiliated disciplines, update the member_discipline table
  let writeDisciplines = async (discArr, memberId, response, link) => {
    let queryText = `delete from member_discipline where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows);
      if (discArr === undefined) {
        response.redirect(link);
        return;
      }
      if (!Array.isArray(discArr)) {
        discArr = [parseInt(discArr)];
      }
      for (let i = 0; i < discArr.length; i++) {
        queryText = `insert into member_discipline (member_id, discipline_id) values (${memberId}, ${discArr[i]}) returning *`;
        await pool.query(queryText).then(async (result) => {
          console.log(result.rows);
        });
      }
      response.redirect(link);
    });
  };

  //Update edited athlete profile
  let writeAthleteProfileAndClubAthletes = async (
    memberId,
    gender,
    dob,
    picture,
    discArr,
    response,
    link,
    clubsArr
  ) => {
    let queryText = `update profiles set gender = '${gender}', dateofbirth = '${dob}', picture = '${picture}' where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      queryText = `delete from club_athlete where athlete_member_id = ${memberId} returning *`;
      //Update club_athlete table
      await pool.query(queryText).then(async (result) => {
        console.log("clubs arr: ", clubsArr);
        if (clubsArr === undefined) {
          writeDisciplines(discArr, memberId, response, link);
          return;
        }
        if (!Array.isArray(clubsArr)) {
          clubsArr = [parseInt(clubsArr)];
        }
        console.log("clubs arr 2:", clubsArr);
        for (let i = 0; i < clubsArr.length; i++) {
          queryText = `insert into club_athlete (club_member_id, athlete_member_id) values (${clubsArr[i]}, ${memberId}) returning *`;
          await pool.query(queryText).then(async (result) => {
            console.log(result.rows);
          });
        }
        writeDisciplines(discArr, memberId, response, link);
      });
    });
  };

  //Update edited club profile
  let writeClubProfile = async (
    memberId,
    website,
    ig,
    fb,
    picture,
    discArr,
    response,
    link
  ) => {
    let queryText = `update profiles set club_website_url = '${website}', club_ig_url = '${ig}', club_facebook_url = '${fb}', picture = '${picture}' where member_id = ${memberId} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      writeDisciplines(discArr, memberId, response, link);
    });
  };

  //Get all data on all clubs
  let getClubData = async (cb) => {
    let queryText = `select profiles.member_id, profiles.member_type_id, profiles.picture, profiles.club_website_url, profiles.club_ig_url, profiles.club_facebook_url, members.full_name, members.email, members.street_address, members.postal_code, members.unit from profiles join members on (members.id = profiles.member_id) where profiles.member_type_id = 2 order by members.full_name asc`;
    //Get members and profiles data, order by club name
    await pool.query(queryText).then(async (result) => {
      let data = {};
      data.clubsArr = result.rows;
      //For each club, get the disciplines offered
      for (let i = 0; i < data.clubsArr.length; i++) {
        queryText = `select member_discipline.member_id, member_discipline.discipline_id, discipline.type from member_discipline join discipline on (member_discipline.discipline_id = discipline.id) where member_discipline.member_id = ${data.clubsArr[i].member_id}`;
        await pool.query(queryText).then(async (result) => {
          data.clubsArr[i].discArr = result.rows;
          queryText = `select club_athlete.club_member_id, club_athlete.athlete_member_id, members.full_name from club_athlete join members on (members.id = club_athlete.athlete_member_id) where club_athlete.club_member_id = ${data.clubsArr[i].member_id}`;
          //For each club, get the athletes affiliated
          await pool.query(queryText).then(async (result) => {
            data.clubsArr[i].athArr = result.rows;
          });
        });
      }
      cb(data);
    });
  };

  //Get data on all athletes
  let getAthleteData = async (cb) => {
    let queryText = `select profiles.member_id, profiles.member_type_id, profiles.picture, profiles.dateofbirth, profiles.gender, members.full_name, members.email, members.street_address, members.postal_code, members.unit from profiles join members on (members.id = profiles.member_id) where profiles.member_type_id = 1 order by members.full_name asc`;
    //get data from members and profiles, order by athlete name
    await pool.query(queryText).then(async (result) => {
      let data = {};
      data.athArr = result.rows;
      //For each athlete
      for (let i = 0; i < data.athArr.length; i++) {
        queryText = `select member_discipline.member_id, member_discipline.discipline_id, discipline.type from member_discipline join discipline on (member_discipline.discipline_id = discipline.id) where member_discipline.member_id = ${data.athArr[i].member_id}`;
        //Get all affiliated disciplines
        await pool.query(queryText).then(async (result) => {
          data.athArr[i].discArr = result.rows;
          queryText = `select club_athlete.club_member_id, club_athlete.athlete_member_id, members.full_name from club_athlete join members on (members.id = club_athlete.club_member_id) where club_athlete.athlete_member_id = ${data.athArr[i].member_id}`;
          //Get all affiliated clubs
          await pool.query(queryText).then(async (result) => {
            data.athArr[i].clubArr = result.rows;
          });
        });
      }
      cb(data);
    });
  };

  //Get all the club and athlete member data affiliated to each discipline
  let getDiscData = (discId, cb) => {
    let queryText = `select members.full_name, member_discipline.member_id, member_discipline.discipline_id, members.member_type_id, discipline.type, profiles.club_website_url from members join member_discipline on (member_discipline.member_id = members.id) join discipline on (discipline.id = member_discipline.discipline_id) join profiles on (profiles.member_id = member_discipline.member_id) where member_discipline.discipline_id = ${discId}`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows);
      }
    });
  };

  //Count the number of athlete and club members for each discipline
  let getTableByDisc = async (cb) => {
    let queryText = `SELECT
    sum(case when discipline.id=1 and members.member_type_id=2 then 1 else 0 end) as mag,
    sum(case when discipline.id=2 and members.member_type_id=2 then 1 else 0 end) as wag,
    sum(case when discipline.id=3 and members.member_type_id=2 then 1 else 0 end) as rg,
    sum(case when discipline.id=4 and members.member_type_id=2 then 1 else 0 end) as tramp,
    sum(case when discipline.id=5 and members.member_type_id=2 then 1 else 0 end) as acro,
    sum(case when discipline.id=6 and members.member_type_id=2 then 1 else 0 end) as aero
    from members 
    JOIN member_discipline ON members.id=member_discipline.member_id 
    JOIN discipline ON member_discipline.discipline_id=discipline.id`;
    let data = {};
    await pool.query(queryText).then(async (result) => {
      data.clubsCount = result.rows[0];
      queryText = `SELECT
      sum(case when discipline.id=1 and members.member_type_id=1 then 1 else 0 end) as mag,
      sum(case when discipline.id=2 and members.member_type_id=1 then 1 else 0 end) as wag,
      sum(case when discipline.id=3 and members.member_type_id=1 then 1 else 0 end) as rg,
      sum(case when discipline.id=4 and members.member_type_id=1 then 1 else 0 end) as tramp,
      sum(case when discipline.id=5 and members.member_type_id=1 then 1 else 0 end) as acro,
      sum(case when discipline.id=6 and members.member_type_id=1 then 1 else 0 end) as aero
      from members 
      JOIN member_discipline ON members.id=member_discipline.member_id 
      JOIN discipline ON member_discipline.discipline_id=discipline.id`;
      await pool.query(queryText).then(async (result) => {
        data.athCount = result.rows[0];
        cb(data);
      });
    });
  };

  return {
    getData: getData,
    writeAthleteProfileAndClubAthletes: writeAthleteProfileAndClubAthletes,
    writeClubProfile: writeClubProfile,
    writeDisciplines: writeDisciplines,
    getClubData: getClubData,
    getAthleteData: getAthleteData,
    getDiscData: getDiscData,
    getTableByDisc: getTableByDisc,
  };
};
