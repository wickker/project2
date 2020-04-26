var React = require("react");
var Main = require("../MAIN");

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

              {/* Athlete Profile */}
              <div id="athlete-add-fields">
                <h5 className="mb-3">Athlete Membership - Additional Fields</h5>
                <select name="gender" className="custom-select" required>
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <br></br>
                <br></br>
                <h6 className="mb-1">Date Of Birth:</h6>
                <input
                  type="date"
                  className="form-control date_input"
                  name="dob"
                ></input>
                <br></br>
                <h6 className="mb-1">Upload Profile Picture:</h6>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="dp-but">
                      Upload
                    </span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="dp-input"
                      aria-describedby="dp-but"
                    />
                    <input type="hidden" id="dp_url" name="dp_url"></input>
                    <label class="custom-file-label" for="dp-input">
                      Choose Image File
                    </label>
                  </div>
                </div>
                <div>
                  <img
                    id="img-preview-dp"
                    src="https://icons-for-free.com/iconfiles/png/512/add+create+new+profile+user+icon-1320185001431562707.png"
                    height="200px"
                    width="200px"
                  ></img>
                </div>
              </div>

              {/* Club Profile */}
              <div id="club-add-fields">
                <h5 className="mb-3">Club Membership - Additional Fields</h5>
                <h6 className="mb-1">Upload Club Logo:</h6>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="logo-but">
                      Upload
                    </span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="logo-input"
                      aria-describedby="logo-but"
                    />
                    <input type="hidden" id="logo_url" name="logo_url"></input>
                    <label class="custom-file-label" for="logo-input">
                      Choose Image File
                    </label>
                  </div>
                </div>
                <div>
                  <img
                    id="img-preview-logo"
                    src="https://cdn4.iconfinder.com/data/icons/adiante-apps-app-templates-incos-in-grey/512/app_type_real_state_512px_GREY.png"
                    height="200px"
                    width="200px"
                  ></img>
                </div>
              </div>

              <br></br>
              <input className="btn btn-primary" type="submit" value="Submit" />
              <br></br>
            </form>

            <script src="/bs-custom-file-input.js" />
            <script src="/script-register.js"></script>
          </div>
        </div>
      </div>
    );
    return <Main children={Register} />;
  }
}

module.exports = Register;
