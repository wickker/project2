module.exports = (pool) => {

  let registrationForm = (cb) => {
    let queryText = "select * from member_type";
    pool.query(queryText, (err, result) => {
      cb(result.rows);
    });
  }

  return {
    registrationForm: registrationForm
  };
};
