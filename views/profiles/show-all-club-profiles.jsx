var React = require("react");
var Main = require("../MAIN");
var ShowAllClubsMod = require("./show-one-club-profile-mod");

class ShowAllClubProfiles extends React.Component {
  render() {
    let clubsArrHtmlAlpha = this.props.clubsArr.map((element) => {
      return <ShowAllClubsMod club={element} />;
    });

    let clubsArr = this.props.clubsArr;
    clubsArr.sort(function (a, b) {
      return b.athArr.length - a.athArr.length;
    });

    let clubsArrHtmlAthSort = clubsArr.map((element) => {
      return <ShowAllClubsMod club={element} />;
    });

    const ShowAllClubProfiles = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
          <div className="mb-5 mt-2 h3">Clubs</div>

            <div id="map"></div>
            <div className="button-div mt-4 mb-4">
            <button className="button" id="download-button-2">
              Download All Club Details As CSV
            </button>

            <button className="button" id="sort-button">Sort Clubs By Popularity</button>
            </div>
            <div id="by-alpha">{clubsArrHtmlAlpha}</div>

            <div id="by-athcount" hidden>{clubsArrHtmlAthSort}</div>
          </div>
        </div>

        <script src="/script-map.js"></script>
        <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO3YiGbflnY-tApZTBzHvExI4E_EtgqNA&libraries=places&callback=initMap"
        ></script>
        <script src="/script-dlcsv-club.js"></script>
      </div>
    );
    return <Main children={ShowAllClubProfiles} />;
  }
}

module.exports = ShowAllClubProfiles;
