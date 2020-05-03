var React = require("react");
var Main = require("../MAIN");
var ShowAllAthletesMod = require("./show-one-athlete-profile-mod");

class ShowAllAthleteProfiles extends React.Component {
  render() {
    let athletesArrHtml = this.props.athArr.map((element) => {
      return <ShowAllAthletesMod athlete={element} />;
    });

    const ShowAllAthleteProfiles = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <div className="mb-4 mt-2 h3">Athletes</div>
            <div className="button-div mb-4">
              <button id="download-button" className="button">
                Download All Athlete Details As CSV
              </button>
            </div>
            {athletesArrHtml}
          </div>
        </div>
        <script src="/script-dlcsv-athlete.js"></script>
      </div>
    );
    return <Main children={ShowAllAthleteProfiles} />;
  }
}

module.exports = ShowAllAthleteProfiles;
