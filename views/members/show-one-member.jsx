var React = require("react");
var Main = require("../MAIN");

class ShowOneMember extends React.Component {
  render() {
    let personalData = this.props.personalData;

    //Format join date
    let joinDate = new Date(
      parseInt(personalData.join_date)
    ).toLocaleDateString();

    //Format unit number
    let unitNum;
    if (!personalData.unit) {
      unitNum = "Nil";
    } else {
      unitNum = personalData.unit;
    }

    let paymentStatus;
    let textColor;
    let payButton = "";

    //Checks payment status and generates payment button if payment has not been made
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
          className="button"
        >
          Make Payment Now
        </button>
      );
    }

    const ShowOneMember = (
      <div className="container">
        <div className="row">
          <div className="col mt-4 entry">
            <div className="mb-4 h3">Bio-Data</div>
            <div className="h5">
              <h5>
                <span>Member Id:</span> {personalData.id}
              </h5>
              <h5>
                <span>Full Name / Club Name:</span> {personalData.full_name}
              </h5>
              <h5>
                <span>Password:</span> {personalData.password}
              </h5>
              <h5>
                <span>Email:</span> {personalData.email}
              </h5>
              <h5>
                <span>Street Address:</span> {personalData.street_address}
              </h5>
              <h5>
                <span>Unit Number:</span> {unitNum}
              </h5>
              <h5>
                <span>Postal Code:</span> {personalData.postal_code}
              </h5>
              <h5>
                <span>Join Date:</span> {joinDate}
              </h5>
              <h5>
                <span>Payment Status:</span>{" "}
                <span className={textColor}>{paymentStatus}</span>
              </h5>
              {payButton}
            </div>
          </div>
        </div>
        <script src="https://js.stripe.com/v3/"></script>
        <script src="/script-one-member.js"></script>
      </div>
    );
    return <Main children={ShowOneMember} />;
  }
}

module.exports = ShowOneMember;
