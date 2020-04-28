module.exports = (pool) => {
  //Returns member type data to populate registration dropdown list
  let registrationForm = (cb) => {
    let queryText = "select * from member_type";
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows);
      }
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
    cb
  ) => {
    let queryText = `insert into members (full_name, password, email, member_type_id, street_address, postal_code, unit, join_date, ispaid) values ('${name}', '${pw}', '${email}', ${memberTypeId}, '${address}', '${postcode}', '${unit}', ${joinDate}, 'false') returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      let memberId = result.rows[0].id;
      queryText = `insert into profile (member_id, member_type_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (${memberId}, ${memberTypeId}, '${picture}', '${dob}', '${gender}', '${website}', '${ig}', '${facebook}') returning *`;
      await pool.query(queryText).then(async (result) => {
        console.log(result.rows[0]);
        let queryText = `select * from member_type where id = ${memberTypeId}`;
        await pool.query(queryText).then(async (result) => {
          data = {
            memberTypeDetails: result.rows[0],
            memberId: memberId,
          };
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
  }

  let verifyLogin = (email, pw, cb) => {
    let queryText = `select * from members where email ='${email}' and password = '${pw}'`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows);
      }
    });
  }

  let printName = (cb, id) => {
    let queryText = `select * from members where id = ${id}`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(result.rows[0]);
      }
    });
  }

  return {
    registrationForm: registrationForm,
    paymentDetails: paymentDetails,
    writeToMembersAndProfile: writeToMembersAndProfile,
    writePaymentId: writePaymentId,
    verifyLogin: verifyLogin,
    printName: printName
  };
};
