var React = require("react");
var Main = require("../MAIN");

class Register extends React.Component {
  render() {
    let memberTypeArr = this.props.memberTypeArr;
    let memberTypeArrHtml = memberTypeArr.map((element) => {
      let string = element.type + " - $" + element.price;
      return <option value={element.id}>{string}</option>;
    });

    let disciplineArr = this.props.disciplineArr;
    let disciplineArrHtml = disciplineArr.map((element) => {
      return (
        <div className="ml-4 form-check">
          <input
            className="form-check-input-disc"
            type="checkbox"
            name="discipline"
            value={element.id}
          />
          <label>{element.type}</label>
        </div>
      );
    });

    let defaultPicture =
      "https://icons-for-free.com/iconfiles/png/512/add+create+new+profile+user+icon-1320185001431562707.png";


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
          <div className="col mt-5">
            <h3 className="mb-4">New Membership Registration</h3>
            
            <form id="registration-form">
              <input
                type="text"
                id="full_name"
                placeholder="Full Name As Per NRIC OR Club Name"
                className="form-control"
                required
              />
              <br></br>
              <input
                type="text"
                id="password"
                placeholder="Password"
                className="form-control"
                required
              />
              <br></br>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="form-control"
                required
              />
              <br></br>
              <div id="dupli-email"></div>
              
              <input
                type="text"
                id="street_address"
                placeholder="Street Address"
                className="form-control"
                required
              />
              <br></br>
              <input
                type="text"
                id="unit"
                placeholder="Unit Number"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                id="postal_code"
                placeholder="Postal Code"
                className="form-control"
                required
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
              <h4 className="mb-4 profile athlete" hidden>
                Athlete Membership - Profile
              </h4>

              <h4 className="mb-4 profile club" hidden>
                Club Membership - Profile
              </h4>

              <div className="profile athlete club" hidden>
                <h6 className="mb-2">
                  Select Affiliated Gymnastics Disciplines:
                </h6>
                {disciplineArrHtml}
                <br></br>
              </div>

              <div className="profile athlete" hidden>
                <h6 className="mb-2">
                  Select Affiliated Clubs:
                </h6>
                {clubsArrHtml}
                <br></br>
              </div>

              <div className="profile athlete" hidden>
                <select id="gender" className="custom-select compulsory">
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
                <h6 className="mb-1">Date Of Birth:</h6>
                <input
                  type="date"
                  className="form-control date_input compulsory"
                  id="date_of_birth"
                ></input>
                <br></br>
              </div>

              <div className="profile club" hidden>
                <input
                  type="text"
                  className="form-control"
                  id="club_website_url"
                  placeholder="Website URL"
                ></input>
                <br></br>
              </div>

              <div className="profile club" hidden>
                <input
                  type="text"
                  className="form-control"
                  id="club_ig_url"
                  placeholder="Instagram URL"
                ></input>
                <br></br>
              </div>

              <div className="profile club" hidden>
                <input
                  type="text"
                  className="form-control"
                  id="club_facebook_url"
                  placeholder="Facebook URL"
                ></input>
                <br></br>
              </div>

              <div className="profile athlete club" hidden>
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
                      value={defaultPicture}
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
              <div id="regex-error"></div>
              <br></br>
              <button
                id="submit-and-pay-button"
                className="btn btn-primary"
                type="submit"
              >
                Submit And Pay
              </button>
              <br></br>
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
