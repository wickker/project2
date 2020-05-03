var React = require("react");
var Main = require("../MAIN");

class Register extends React.Component {
  render() {
    //Creates membership type price dropdown list
    let memberTypeArr = this.props.memberTypeArr;
    let memberTypeArrHtml = memberTypeArr.map((element) => {
      let string = element.type + " - $" + element.price;
      return (
        <option value={element.id} className="input">
          {string}
        </option>
      );
    });

    //Creates list of checkboxes for affiliated disciplines
    let disciplineArr = this.props.disciplineArr;
    let disciplineArrHtml = disciplineArr.map((element) => {
      return (
        <div className="ml-4 form-check">
          <input
            className="form-check-input-disc input"
            type="checkbox"
            name="discipline"
            value={element.id}
          />
          <label>{element.type}</label>
        </div>
      );
    });

    //Sets default profile/ logo picture
    let defaultPicture =
      "https://icons-for-free.com/iconfiles/png/512/add+create+new+profile+user+icon-1320185001431562707.png";

    //Creates list of checkboxes for affiliated clubs
    let clubsArr = this.props.clubsArr;
    let clubsArrHtml = clubsArr.map((element) => {
      return (
        <div className="ml-4 form-check">
          <input
            className="form-check-input-club"
            type="checkbox"
            name="club"
            value={element.id}
          />
          <label>{element.full_name}</label>
        </div>
      );
    });

    const Register = (
      <div className="container">
        <div className="row">
          <div className="col mt-5 form">
            <div className="mb-5 h3">New Membership Registration</div>
            {/* Main registration form  */}
            <form id="registration-form">
              <input
                type="text"
                id="full_name"
                placeholder="Full Name As Per NRIC / Club Name"
                className="form-control input"
                required
              />
              <br></br>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-control input"
                required
              />
              <input type="checkbox" id="show-pw" className="input" />
              <label>Show Password</label>

              <br></br>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="form-control input"
                required
              />
              <br></br>
              {/* If there is a duplicate email  */}
              <div id="dupli-email"></div>
              <input
                type="text"
                id="street_address"
                placeholder="Street Address"
                className="form-control input"
                required
              />
              <br></br>
              <input
                type="text"
                id="unit"
                placeholder="Unit Number"
                className="form-control input"
              />
              <br></br>
              <input
                type="text"
                id="postal_code"
                placeholder="Postal Code"
                className="form-control input"
                required
              />
              <br></br>
              <select
                name="membership_type_id"
                className="custom-select input"
                id="member-type"
                required
              >
                <option value="" className="input" disabled selected>
                  Select Membership Type
                </option>
                {memberTypeArrHtml}
              </select>
              <br></br>
              <br></br>

              {/* Profile fields */}
              <div className="mt-4 mb-5 profile athlete h4" hidden>
                Athlete Membership - Profile
              </div>
              <div className="mt-4 mb-5 profile club h4" hidden>
                Club Membership - Profile
              </div>
              <div className="profile athlete club" hidden>
                <div className="mb-2 h6">
                  Select Affiliated Gymnastics Disciplines
                </div>
                {disciplineArrHtml}
                <br></br>
              </div>
              <div className="profile athlete" hidden>
                <div className="mb-2 h6">Select Affiliated Clubs</div>
                {clubsArrHtml}
                <br></br>
              </div>
              <div className="profile athlete" hidden>
                <select id="gender" className="custom-select compulsory input">
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <br></br>
                <br></br>
              </div>
              <div className="profile athlete" hidden>
                <div className="mb-2 h6">Date of Birth</div>
                <input
                  type="date"
                  className="form-control date_input compulsory input"
                  id="date_of_birth"
                ></input>
                <br></br>
              </div>
              <div className="profile club" hidden>
                <input
                  type="text"
                  className="form-control input"
                  id="club_website_url"
                  placeholder="Website URL"
                ></input>
                <br></br>
              </div>
              <div className="profile club" hidden>
                <input
                  type="text"
                  className="form-control input"
                  id="club_ig_url"
                  placeholder="Instagram URL"
                ></input>
                <br></br>
              </div>
              <div className="profile club" hidden>
                <input
                  type="text"
                  className="form-control input"
                  id="club_facebook_url"
                  placeholder="Facebook URL"
                ></input>
                <br></br>
              </div>
              <div className="profile athlete club" hidden>
                <div className="mb-2 h6">
                  Upload Profile Picture / Club Logo
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text input"
                      id="picture_upload_button"
                    >
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
                      value={defaultPicture}
                    ></input>
                    <label class="custom-file-label" for="picture-input">
                      Choose Image File
                    </label>
                  </div>
                </div>
                <div className="mb-3 mt-3 h6">Preview Image</div>
                <div>
                  <img
                    id="picture-preview"
                    src={defaultPicture}
                    height="200px"
                    width="200px"
                  ></img>
                </div>
              </div>

              {/* If there is a regex error  */}
              <div id="regex-error" className="error-msg"></div>
              <br></br>

              {/* Submit button */}
              <div className="button-div">
                <button
                  id="submit-and-pay-button"
                  className="button"
                  type="submit"
                >
                  Submit And Pay
                </button>
              </div>
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
