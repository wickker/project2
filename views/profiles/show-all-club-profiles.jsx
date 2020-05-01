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

            <div id="map"></div>

            <button id="download-button-2">Download All Club Details As CSV</button>

            {clubsArrHtml}
          </div>
        </div>
        
        <script src="/script-map.js"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO3YiGbflnY-tApZTBzHvExI4E_EtgqNA&libraries=places&callback=initMap"></script>
        <script src="/script-dlcsv-club.js"></script>
      </div>
    );
    return <Main children={ShowAllClubProfiles} />;
  }
}

module.exports = ShowAllClubProfiles;
