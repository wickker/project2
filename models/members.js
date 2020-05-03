module.exports = (pool) => {
  //Returns member type data to populate registration dropdown list
  let registrationForm = async (cb) => {
    let queryText = "select * from member_type";
    let data;
    await pool.query(queryText).then(async (result) => {
      data = {
        memberTypeArr: result.rows,
      };
      queryText = "select * from discipline";
      await pool.query(queryText).then(async (result) => {
        data.disciplineArr = result.rows;
        queryText = "select * from members where member_type_id = 2";
        await pool.query(queryText).then(async (result) => {
          data.clubsArr = result.rows;
          cb(data);
        });
      });
    });
  };

  //Returns member type details for billing purposes
  let paymentDetails = (memberTypeId, cb) => {
    let queryText = `select * from member_type where id = ${memberTypeId}`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows[0]);
      }
    });
  };

  //Write registration form data to 'members' and 'profile' table
  let writeToMembersAndProfile = async (
    name,
    pw,
    email,
    address,
    unit,
    postcode,
    memberTypeId,
    joinDate,
    gender,
    dob,
    website,
    ig,
    facebook,
    picture,
    discArr,
    clubsArr,
    cb
  ) => {
    let queryText = `insert into members (full_name, password, email, member_type_id, street_address, postal_code, unit, join_date, ispaid) values ('${name}', '${pw}', '${email}', ${memberTypeId}, '${address}', '${postcode}', '${unit}', ${joinDate}, 'false') returning *`;
    //Write members data
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      let memberId = result.rows[0].id;
      queryText = `insert into profiles (member_id, member_type_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (${memberId}, ${memberTypeId}, '${picture}', '${dob}', '${gender}', '${website}', '${ig}', '${facebook}') returning *`;
      //Write profiles data
      await pool.query(queryText).then(async (result) => {
        console.log(result.rows[0]);
        let queryText = `select * from member_type where id = ${memberTypeId}`;
        //Get selected member type details to create payment session
        await pool.query(queryText).then(async (result) => {
          let data = {
            memberTypeDetails: result.rows[0],
            memberId: memberId,
          };
          //If there are affiliated disciplines, write to member_discipline
          if (discArr) {
            for (let i = 0; i < discArr.length; i++) {
              queryText = `insert into member_discipline (member_id, discipline_id) values (${memberId}, ${discArr[i]}) returning *`;
              await pool.query(queryText).then(async (result) => {
                console.log(result.rows[0]);
              });
            }
          }
          //If there are affiliated clubs, write to club_athlete
          if (clubsArr) {
            for (let x = 0; x < clubsArr.length; x++) {
              queryText = `insert into club_athlete (club_member_id, athlete_member_id) values (${clubsArr[x]}, ${memberId}) returning *`;
              await pool.query(queryText).then(async (result) => {
                console.log(result.rows[0]);
              });
            }
          }
          //Send on data required to create payment session 
          cb(data);
        });
      });
    });
  };

  //Update payment_session_id and payment status to members table upon successful completion of payment
  let writePaymentId = (sessionId, memberId) => {
    let queryText = `update members set payment_session_id = '${sessionId}', ispaid = 'true' where id = ${memberId} returning *`;
    console.log(queryText);
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows[0]);
      }
    });
  };

  //Looks for login match
  let verifyLogin = (email, pw, cb) => {
    let queryText = `select * from members where email ='${email}' and password = '${pw}'`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows);
      }
    });
  };

  //Gets selected member biodata
  let printName = (cb, id) => {
    let queryText = `select * from members where id = ${id}`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows[0]);
      }
    });
  };

  //Update biodata
  let updateMember = (id, name, pw, email, unit, postcode, address) => {
    let queryText = `update members set full_name = '${name}', password = '${pw}', email = '${email}', unit = '${unit}', postal_code = ${postcode}, street_address = '${address}' where id = ${id} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("edited member:", result.rows[0]);
      }
    });
  };

  //Check for existence of email
  let retrieveEmail = (cb, email) => {
    let queryText = `select * from members where email = '${email}'`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows);
      }
    });
  };

  //Get club and athlete member counts
  let getClubMembersCount = (cb) => {
    let queryText = `select sum(case when member_type_id=1 then 1 else 0 end) as athletes, sum(case when member_type_id=2 then 1 else 0 end) as clubs from profiles;`
    pool.query(queryText, (err, result) => {
      cb(result.rows);
    });
  }

  return {
    registrationForm: registrationForm,
    paymentDetails: paymentDetails,
    writeToMembersAndProfile: writeToMembersAndProfile,
    writePaymentId: writePaymentId,
    verifyLogin: verifyLogin,
    printName: printName,
    updateMember: updateMember,
    retrieveEmail: retrieveEmail,
    getClubMembersCount: getClubMembersCount
  };
};
