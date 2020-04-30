var React = require("react");
var Main = require("../MAIN");
var ShowAllClubsMod = require("./show-one-club-profile-mod");

class ShowAllClubProfiles extends React.Component {
  render() {
    let clubsArrHtml = this.props.clubsArr.map((element) => {
      return <ShowAllClubsMod club={element} />;
    });

    const ShowAllClubProfiles = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3>View All Clubs</h3>

            {clubsArrHtml}
            
          </div>
        </div>
      </div>
    );
    return <Main children={ShowAllClubProfiles} />;
  }
}

module.exports = ShowAllClubProfiles;
