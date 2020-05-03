var React = require("react");

class ShowAllAthletesMod extends React.Component {
  render() {
    let athlete = this.props.athlete;
    let discHtml = "";
    let discText = "";
    let clubText = "";
    let clubHtml = "";
    let athleteProfileLink = "/profiles/" + athlete.member_id;
    

    if (athlete.discArr.length > 0) {
      discHtml = athlete.discArr.map((element) => {
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
          <span className="mr-3">
            <a href={link}>{element.type}</a>
          </span>
        );
      });
      discText = "Affiliated Disciplines: ";
    }

    if (athlete.clubArr.length > 0) {
      clubHtml = athlete.clubArr.map((element) => {
        let link = "/profiles/" + element.club_member_id;
        return (
          <span className="mr-3">
            <a href={link}>{element.full_name}</a>
          </span>
        );
      });
      clubText = "Affiliated Clubs: ";
    }

    return (
      <div className="col ath-form">
        <div className="row">
          <div className="col-5 card-left">
            <a href={athleteProfileLink} target="_blank">
              <img
                src={athlete.picture}
                alt="athlete logo"
                height="250px"
                width="250px"
              />
            </a>
          </div>
          <div className="col-7 card-right" id="ath-deets">
            <div className="h4 mb-3">
              {athlete.full_name}
            </div>
            <p className="mb-0">{discText}</p>
            <p>{discHtml}</p>
            <p>Email: {athlete.email}</p>
            <p>Date of Birth: {athlete.dateofbirth}</p>
            <p>Gender: {athlete.gender}</p>
            <p className="mb-0">{clubText}</p>
            <p>{clubHtml}</p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ShowAllAthletesMod;
