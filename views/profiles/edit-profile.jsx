var React = require("react");
var Main = require("../MAIN");

class EditProfile extends React.Component {
  render() {
    let defaultPicture =
      "https://icons-for-free.com/iconfiles/png/512/add+create+new+profile+user+icon-1320185001431562707.png";

    // console.log(this.props);
    let profile = this.props.profile;
    let discArr = this.props.disciplineArr;
    let discArrOg = this.props.disciplineArrOg;

    let discArrHtml = discArrOg.map((element) => {
      let isChecked = false;
      for (let i = 0; i < discArr.length; i++) {
        if (discArr[i].discipline_id === element.id) {
          isChecked = true;
        }
      }
      return (
        <div className="ml-4 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="discipline"
            value={element.id}
            checked={isChecked}
          />
          <label>{element.type}</label>
        </div>
      );
    });

    let profileType;
    let fields;

    if (profile.member_type_id === 1) {
      profileType = "Athlete";

      fields = (
        <div>
          <h6>Select Gender:</h6>
          <select
            name="gender"
            className="custom-select compulsory"
            value={profile.gender}
          >
            {/* <option value="" disabled selected>
              Select Gender
            </option> */}
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <br></br>
          <br></br>
          <h6>Date Of Birth:</h6>
          <input
            type="date"
            className="form-control date_input compulsory"
            name="date_of_birth"
            value={profile.dateofbirth}
          ></input>
          <br></br>
        </div>
      );
    } else {
      profileType = "Club";
      fields = (
        <div>
          <h6>Website:</h6>
          <input
            type="text"
            className="form-control"
            name="club_website_url"
            value={profile.club_website_url}
          ></input>
          <br></br>
          <h6>Instagram:</h6>
          <input
            type="text"
            className="form-control"
            name="club_ig_url"
            value={profile.club_ig_url}
          ></input>
          <br></br>
          <h6>Facebook:</h6>
          <input
            type="text"
            className="form-control"
            name="club_facebook_url"
            value={profile.club_facebook_url}
          ></input>
        </div>
      );
    }

    const EditProfile = (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3 className="mb-4">
              Edit {profileType} Profile - {profile.full_name}
            </h3>

            <form method="POST" action="/profiles/:id/edit">
              <h6>Upload Profile Picture/ Club Logo:</h6>
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
                    type=""
                    id="picture_url"
                    name="picture_url"
                    value={profile.picture}
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
                  src={profile.picture}
                  height="200px"
                  width="200px"
                ></img>
              </div>
              <br></br>
              <input
                type="hidden"
                className="form-control"
                name="memberid"
                value={profile.member_id}
              ></input>
              <input
                type="hidden"
                className="form-control"
                name="membertypeid"
                value={profile.member_type_id}
              ></input>
              <h6>Select Affiliated Gymnastics Disciplines:</h6>
              {discArrHtml}
              <br></br>

              {fields}

              <br></br>
              <br></br>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <br></br>
              <br></br>
            </form>

            <script src="/bs-custom-file-input.js"></script>
            <script src="/script-edit-profile.js"></script>
          </div>
        </div>
      </div>
    );
    return <Main children={EditProfile} />;
  }
}

module.exports = EditProfile;
