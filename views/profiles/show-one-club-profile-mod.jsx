var React = require("react");

class ShowAllClubsMod extends React.Component {
  render() {
    let club = this.props.club;
    let discHtml = "";
    let discText = "";
    let athText = "";
    let athHtml = "";

    if (club.discArr.length > 0) {
      discHtml = club.discArr.map((element) => {
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
      discText = "Disciplines Offered: ";
    }

    if (club.athArr.length > 0) {
      athHtml = club.athArr.map((element) => {
        let link = "/profiles/" + element.athlete_member_id;
        return (
          <span className="mr-3">
            <a href={link}>{element.full_name}</a>
          </span>
        );
      });
      athText = "Affiliated Athletes: ";
    }

    return (
      <div className="row border">
        <div className="col-3">
          <a href={club.club_website_url} target="_blank">
            <img
              class="rounded"
              src={club.picture}
              alt="club logo"
              height="200px"
            />
          </a>
        </div>
        <div className="col-9">
          <h4 class="card-title club-name" postcode={club.postal_code}>
            <u>{club.full_name}</u>
          </h4>
          <p class="card-text">Email: {club.email}</p>
          <p class="card-text mb-0">{discText}</p>
          <p>{discHtml}</p>
          <p class="card-text">Number of Athletes: {club.athArr.length}</p>
          <div class="affi-athletes">
            <p class="card-text mb-0">{athText}</p>
            <p>{athHtml}</p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ShowAllClubsMod;
