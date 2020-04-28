var React = require("react");
var Main = require("../MAIN");

class ShowOneMember extends React.Component {
  render() {
    let personalData = this.props.personalData;
    let joinDate = new Date(
      parseInt(personalData.join_date)
    ).toLocaleDateString();

    let unitNum;
    if (!personalData.unit) {
      unitNum = "Nil";
    } else {
      unitNum = personalData.unit;
    }

    let paymentStatus;
    let textColor;
    let payButton = "";
    if (personalData.ispaid === true) {
      paymentStatus = "Paid";
      textColor = "text-success";
    } else {
      paymentStatus = "Unpaid";
      textColor = "text-danger";
      payButton = (
        <button
          id="pay-now"
          memberId={personalData.id}
          memberTypeId={personalData.member_type_id}
          className="btn btn-danger"
        >
          Make Payment Now
        </button>
      );
    }

    const ShowOneMember = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3 className="mb-4">Bio-Data</h3>
            <h5>Member Id: {personalData.id}</h5>
            <h5>Full Name/ Club Name: {personalData.full_name}</h5>
            <h5>Password: {personalData.password}</h5>
            <h5>Email: {personalData.email}</h5>
            <h5>Street Address: {personalData.street_address}</h5>
            <h5>Unit Number: {unitNum}</h5>
            <h5>Postal Code: {personalData.postal_code}</h5>
            <h5>Join Date: {joinDate}</h5>
            <h5>
              Payment Status: <span className={textColor}>{paymentStatus}</span>
            </h5>
            {payButton}
          </div>
        </div>
      </div>
    );
    return <Main children={ShowOneMember} />;
  }
}

module.exports = ShowOneMember;
