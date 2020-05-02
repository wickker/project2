var React = require("react");
var Main = require("../MAIN");

class EditMember extends React.Component {
  render() {
    let memberData = this.props.memberData;

    const EditMember = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3 className="mb-4">Edit Bio-Data</h3>
            {/* <p className="text-danger">
              <em>{this.props.comments}</em>
            </p> */}
            <form method="POST" action="/members/:id/edit">
              <h6>Full Name As Per NRIC OR Club Name:</h6>
              <input
                type="text"
                name="full_name"
                className="form-control"
                value={memberData.full_name}
                required
              />
              <br></br>
              <h6>Password:</h6>
              <input
                type="text"
                name="password"
                value={memberData.password}
                className="form-control"
                required
              />
              <br></br>
              <h6>Email:</h6>
              <input
                type="text"
                id="email-input"
                name="email"
                value={memberData.email}
                className="form-control"
                required
              />
              <br></br>
              <div id="duplicate-email"></div>
              <h6>Street Address:</h6>
              <input
                type="text"
                name="address"
                value={memberData.street_address}
                className="form-control"
                required
              />
              <br></br>
              <h6>Unit Number:</h6>
              <input
                type="text"
                name="unit"
                value={memberData.unit}
                className="form-control"
              />
              <br></br>
              <h6>Postal Code:</h6>
              <input
                type="text"
                name="postal_code"
                value={memberData.postal_code}
                className="form-control"
                required
              />
              <br></br>
              <input
                type="hidden"
                name="member_id"
                value={memberData.id}
                className="form-control"
              />

              <br></br>
              <button id="edit-member-button" className="btn btn-primary" type="submit">
                Submit
              </button>
              <br></br>
              <br></br>
            </form>
          </div>
        </div>
        <script src="/script-edit-biodata.js"></script>
      </div>
    );
    return <Main children={EditMember} />;
  }
}

module.exports = EditMember;
