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

    //Show list of affiliated disciplines
    let discArrHtml;
    let discArr = this.props.disciplineArr;
    discArrHtml = discArr.map((element) => {
      let link;
      switch (element.discipline_id) {
        case 1:
          link = "/discipline/1";
          break;
        case 2:
          link = "/discipline/2";
          break;
        case 3:
          link = "/discipline/3";
          break;
        case 4:
          link = "/discipline/4";
          break;
        case 5:
          link = "/discipline/5";
          break;
        case 6:
          link = "/discipline/6";
      }
      return (
        <li>
          <a href={link} target="_blank">
            {element.type}
          </a>
        </li>
      );
    });

    //If athlete member
    if (profile.member_type_id === 1) {
      memberType = "Athlete";
      discText = "Affiliated Disciplines:";
      //If there are affiliated clubs, generate list
      if (clubsOrAthArr.length > 0) {
        clubsOrAthArrHtml = clubsOrAthArr.map((element) => {
          let profileLink = "/profiles/" + element.club_member_id;
          return (
            <li>
              <a href={profileLink}>{element.full_name}</a>
            </li>
          );
        });
        clubAthText = "Affiliated Clubs:";
        //If there are no affiliated clubs, leave field blank
      } else {
        clubAthText = "";
        clubsOrAthArrHtml = "";
      }
      info = (
        <div>
          <h5>
            <span>Date of Birth:</span> {profile.dateofbirth}
          </h5>
          <h5>
            <span>Gender:</span> {profile.gender}
          </h5>
          <h5>
            <span>{clubAthText}</span>{" "}
          </h5>
          <ul className="list">{clubsOrAthArrHtml}</ul>
        </div>
      );
      //If club member
    } else if (profile.member_type_id === 2) {
      memberType = "Club";
      pictureLink = profile.club_website_url;
      discText = "Disciplines Offered:";
      //If there are affiliated athletes, generate list
      if (clubsOrAthArr.length > 0) {
        clubsOrAthArrHtml = clubsOrAthArr.map((element) => {
          let profileLink = "/profiles/" + element.athlete_member_id;
          return (
            <li>
              <a href={profileLink}>{element.full_name}</a>
            </li>
          );
        });
        clubAthText = "Affiliated Athletes:";
        //If there are no affiliated athletes, leave field blank
      } else {
        clubAthText = "";
        clubsOrAthArrHtml = "";
      }
      info = (
        <div>
          <h5 className="mb-3">
            <span>Number of Athletes:</span> {clubsOrAthArr.length}
          </h5>

          <h5>
            <span>{clubAthText}</span>{" "}
          </h5>
          <ul className="list">{clubsOrAthArrHtml}</ul>
          <br></br>
          <a href={profile.club_ig_url} className="mr-3">
            <img
              id="ig-icon"
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/instagram-512.png"
              height="50px"
              width="50px"
            ></img>
          </a>
          <a href={profile.club_facebook_url}>
            <img
              id="fb-icon"
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png"
              height="50px"
              width="50px"
            ></img>
          </a>
        </div>
      );
    }

    //If there are no affiliated disciplines, leave field blank
    if (discArr.length === 0) {
      discText = "";
      discArrHtml = "";
    }

    const ShowOneProfile = (
      <div className="container">
        <div className="row">
          <div className="col mt-4 entry h5">
            <div className="mb-4 h3">{memberType} Profile</div>
            <h5>
              <span>Name: </span>{profile.full_name}
            </h5>
            <a href={pictureLink}>
              <img src={profile.picture} height="250px" width="250px"></img>
            </a>
            <br></br>
            <br></br>
            <h5>
              <span>{discText}</span>
            </h5>
            <ul className="list">{discArrHtml}</ul>
            {info}
          </div>
        </div>
      </div>
    );
    return <Main children={ShowOneProfile} />;
  }
}

module.exports = ShowOneProfile;
