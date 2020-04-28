var React = require("react");
var Main = require("../MAIN");

class ShowOneProfile extends React.Component {
  render() {
    let profile = this.props.profile;

    let memberType;
    let info;
    let pictureLink="";

    if (profile.member_type_id === 1) {
      memberType = "Athlete";
      info = (
        <div>
          <h5>Date of Birth: {profile.dateofbirth}</h5>
          <h5>Gender: {profile.gender}</h5>
        </div>
      );
    } else {
      memberType = "Club";
      pictureLink = profile.club_website_url;
      info = (
        <div>
          <a href={profile.club_ig_url} className="mr-3"><img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/instagram-512.png" height="50px" width="50px"></img></a>
          <a href={profile.club_facebook_url}><img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png" height="50px" width="50px"></img></a>
        </div>
      );
    }

    const ShowOneProfile = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3 className="mb-4">My {memberType} Profile</h3>
            <h5>Name: {profile.full_name}</h5>
            <br></br>
            <a href={pictureLink}><img src={profile.picture} height="250px" width="250px"></img></a>
            <br></br>
            <br></br>
            {info}
          </div>
        </div>
      </div>
    );
    return <Main children={ShowOneProfile} />;
  }
}

module.exports = ShowOneProfile;
