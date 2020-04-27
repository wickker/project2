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
  let writeToMembersAndProfile = (
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
    picture
  ) => {
    let queryText = `insert into members (full_name, password, email, member_type_id, street_address, postal_code, unit, join_date, ispayment) values ('${name}', '${pw}', '${email}', ${memberTypeId}, '${address}', '${postcode}', '${unit}', ${joinDate}, 'false') returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows[0]);
        let memberId = result.rows[0].id;
        queryText = `insert into profile (member_id, member_type_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (${memberId}, ${memberTypeId}, '${picture}', '${dob}', '${gender}', '${website}', '${ig}', '${facebook}') returning *`;
        pool.query(queryText, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result.rows[0]);
          }
        });
      }
    });
  };

  return {
    registrationForm: registrationForm,
    paymentDetails: paymentDetails,
    writeToMembersAndProfile: writeToMembersAndProfile,
    paymentDone: paymentDone
  };
};
