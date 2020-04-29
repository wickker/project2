var React = require("react");
var Main = require("../MAIN");

class ShowOneProfile extends React.Component {
  render() {
    let profile = this.props.profile;

    let memberType;
    let info;
    let pictureLink = "";
    let discText;
    let clubAthText;
    let clubsOrAthArrHtml;
    let clubsOrAthArr = this.props.clubsOrAthArr;

    let discArrHtml;
    let discArr = this.props.disciplineArr;
    discArrHtml = discArr.map((element) => {
      let link;
      switch (element.discipline_id) {
        case 1:
          link = "https://www.gymnastics.sport/site/discipline.php?disc=2";
          break;
        case 2:
          link = "https://www.gymnastics.sport/site/discipline.php?disc=3";
          break;
        case 3:
          link = "https://www.gymnastics.sport/site/discipline.php?disc=4";
          break;
        case 4:
          link = "https://www.gymnastics.sport/site/discipline.php?disc=5";
          break;
        case 5:
          link = "https://www.gymnastics.sport/site/discipline.php?disc=10";
          break;
        case 6:
          link = "https://www.gymnastics.sport/site/discipline.php?disc=9";
      }
      return (
        <li>
          <a href={link} target="_blank">
            {element.type}
          </a>
        </li>
      );
    });

    if (profile.member_type_id === 1) {
      memberType = "Athlete";
      discText = "Affiliated Disciplines:";
      if (clubsOrAthArr) {
        clubsOrAthArrHtml = clubsOrAthArr.map((element) => {
          let profileLink = "/profiles/" + element.club_member_id;
          return (
            <li>
              <a href={profileLink}>{element.full_name}</a>
            </li>
          );
        });
        clubAthText = "Affiliated Clubs";
      } else {
        clubAthText = "";
        clubsOrAthArrHtml = "";
      }
      info = (
        <div>
          <h5>Date of Birth: {profile.dateofbirth}</h5>
          <h5>Gender: {profile.gender}</h5>
          <h5>Affiliated Clubs:</h5>
          <ul>{clubsOrAthArrHtml}</ul>
        </div>
      );
    } else if (profile.member_type_id === 2) {
      memberType = "Club";
      pictureLink = profile.club_website_url;
      discText = "Disciplines Offered:";
      if (clubsOrAthArr) {
        clubsOrAthArrHtml = clubsOrAthArr.map((element) => {
          let profileLink = "/profiles/" + element.athlete_member_id;
          return (
            <li>
              <a href={profileLink}>{element.full_name}</a>
            </li>
          );
        });
        clubAthText = "Affiliated Athletes";
      } else {
        clubAthText = "";
        clubsOrAthArrHtml = "";
      }
      info = (
        <div>
          <br></br>
          <a href={profile.club_ig_url} className="mr-3">
            <img
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/instagram-512.png"
              height="50px"
              width="50px"
            ></img>
          </a>
          <a href={profile.club_facebook_url}>
            <img
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png"
              height="50px"
              width="50px"
            ></img>
          </a>
          <br></br>
          <br></br>
          <h5>{clubAthText}</h5>
          <ul>{clubsOrAthArrHtml}</ul>
        </div>
      );
    }

    if (discArr.length === 0) {
      discText = "";
      discArrHtml = "";
    }

    const ShowOneProfile = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3 className="mb-4">My {memberType} Profile</h3>
            <h5>Name: {profile.full_name}</h5>
            <br></br>
            <a href={pictureLink}>
              <img src={profile.picture} height="250px" width="250px"></img>
            </a>
            <br></br>
            <br></br>
            <h5>{discText}</h5>
            <ul>{discArrHtml}</ul>

            {info}
          </div>
        </div>
      </div>
    );
    return <Main children={ShowOneProfile} />;
  }
}

module.exports = ShowOneProfile;
