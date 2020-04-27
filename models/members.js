module.exports = (pool) => {

  let registrationForm = (cb) => {
    let queryText = "select * from member_type";
    pool.query(queryText, (err, result) => {
      cb(result.rows);
    });
  }

  let paymentDetails = (id, cb) => {
    let queryText = `select * from member_type where id=${id}`;
    pool.query(queryText, (err, result) => {
      cb(result.rows[0]);
    });
  }

  return {
    registrationForm: registrationForm,
    paymentDetails: paymentDetails
  };
};
