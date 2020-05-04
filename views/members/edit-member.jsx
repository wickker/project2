var React = require("react");
var Main = require("../MAIN");

class EditMember extends React.Component {
  render() {
    let memberData = this.props.memberData;

    const EditMember = (
      <div className="container">
        <div className="row">
          <div className="col mt-5 form">
            <div className="mb-4 h3">Edit Bio-Data</div>
            
            <form method="POST" action="/members/:id/edit">
              <div className="h6">Full Name As Per NRIC / Club Name</div>
              <input
                type="text"
                name="full_name"
                className="form-control input"
                value={memberData.full_name}
                required
              />
              <br></br>
              <div className="h6">Password</div>
              <input
                type="password"
                id="member-pw"
                name="password"
                value={memberData.password}
                className="form-control input"
                required
              />
              <input type="checkbox" id="show-pw-member" className="input" />
              <label>Show Password</label>
              <br></br>
              <br></br>
              <div className="h6">Email</div>
              <input
                type="text"
                id="email-input"
                name="email"
                value={memberData.email}
                className="form-control input"
                required
              />
              <br></br>
              <div id="duplicate-email" className="error-msg"></div>
              <div className="h6">Street Address</div>
              <input
                type="text"
                name="address"
                value={memberData.street_address}
                className="form-control input"
                required
              />
              <br></br>
              <div className="h6">Unit Number</div>
              <input
                type="text"
                name="unit"
                value={memberData.unit}
                className="form-control input"
              />
              <br></br>
              <div className="h6">Postal Code</div>
              <input
                type="text"
                name="postal_code"
                value={memberData.postal_code}
                className="form-control input"
                required
              />
              <br></br>
              <input
                type="hidden"
                name="member_id"
                value={memberData.id}
                className="form-control"
              />

              <div className="button-div">
                <button
                  id="edit-member-button"
                  className="button"
                  type="submit"
                >
                  Submit
                </button>
              </div>

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
