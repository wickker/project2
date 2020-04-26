var React = require("react");
var Main = require("../MAIN");
var DateTime = require("react-datetime");

class Register extends React.Component {
  render() {
    let memberTypeArr = this.props.memberTypeArr;
    let memberTypeArrHtml = memberTypeArr.map((ele) => {
      let string = ele.type + " - $" + ele.price;
      return <option value={ele.id}>{string}</option>;
    });

    const Register = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3 className="mb-4">New Membership Registration</h3>
            {/* <p className="text-danger">
              <em>{this.props.comments}</em>
            </p> */}
            <form method="POST" action="/register">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name As Per NRIC"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="pw"
                placeholder="Password"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="stadd"
                placeholder="Street Address"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="unitno"
                placeholder="Unit Number"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="postalcode"
                placeholder="Postal Code"
                className="form-control"
              />
              <br></br>
              {/* <h6>Select Membership Type:</h6> */}
              <select
                name="membership_type"
                className="custom-select"
                id="member-type"
                required
              >
                <option value="" disabled selected>
                  Select Membership Type
                </option>
                {memberTypeArrHtml}
              </select>
              <br></br>
              <br></br>

              {/* <h6>Date Of Birth:</h6>
              <input
                type="date"
                className="form-control date_input"
              ></input> */}

              <div id="show-prof"></div>

              <br></br>
              <input className="btn btn-primary" type="submit" value="Submit" />
              <br></br>
            </form>

            <script src="/script-register.js"></script>
          </div>
        </div>
      </div>
    );
    return <Main children={Register} />;
  }
}

module.exports = Register;
