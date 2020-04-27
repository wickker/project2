var React = require("react");
var Main = require("../MAIN");

class Register extends React.Component {
  render() {
    let memberTypeArr = this.props.memberTypeArr;
    let memberTypeArrHtml = memberTypeArr.map((element) => {
      let string = element.type + " - $" + element.price;
      return <option value={element.id}>{string}</option>;
    });

    let defaultPicture =
      "https://icons-for-free.com/iconfiles/png/512/add+create+new+profile+user+icon-1320185001431562707.png";

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
                name="full_name"
                placeholder="Full Name As Per NRIC OR Club Name"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="password"
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
                name="street_address"
                placeholder="Street Address"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="unit"
                placeholder="Unit Number"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                className="form-control"
              />
              <br></br>
              <select
                name="membership_type_id"
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

              {/* Profile Fields */}
              <h5 className="mb-3 profile athlete">
                Athlete Membership - Profile
              </h5>

              <h5 className="mb-3 profile club">Club Membership - Profile</h5>

              <div className="profile athlete">
                <select name="gender" className="custom-select">
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <br></br>
                <br></br>
              </div>

              <div className="profile athlete">
                <h6 className="mb-1">Date Of Birth:</h6>
                <input
                  type="date"
                  className="form-control date_input"
                  name="date_of_birth"
                ></input>
                <br></br>
              </div>

              <div className="profile athlete club">
                <h6 className="mb-1">Upload Profile Picture/ Club Logo:</h6>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="picture_upload_button">
                      Upload
                    </span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="picture-input"
                      aria-describedby="picture_upload_button"
                    />
                    <input
                      type="hidden"
                      id="picture_url"
                      name="picture_url"
                      value={defaultDp}
                    ></input>
                    <label class="custom-file-label" for="picture-input">
                      Choose Image File
                    </label>
                  </div>
                </div>
                <h6 className="mb-3 mt-3">Preview Image:</h6>
                <div>
                  <img
                    id="picture-preview"
                    src={defaultPicture}
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
            <script src="https://js.stripe.com/v3/"></script>
            <script src="/script-register.js"></script>
          </div>
        </div>
      </div>
    );
    return <Main children={Register} />;
  }
}

module.exports = Register;
