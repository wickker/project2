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
      <div class="card">
        <a href={club.club_website_url} target="_blank">
          <img class="card-img-top" src={club.picture} alt="club logo" height="350px"/>
        </a>
        <div class="card-body text-center">
          <h4 class="card-title">
            <u>{club.full_name}</u>
          </h4>
          <p class="card-text mb-0">{discText}</p>
          <p>{discHtml}</p>
          <p class="card-text">Number of Athletes: {club.athArr.length}</p>
          <p class="card-text mb-0">{athText}</p>
          <p>{athHtml}</p>
        </div>
        {/* <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div> */}
      </div>
    );
  }
}

module.exports = ShowAllClubsMod;
