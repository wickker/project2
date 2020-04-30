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
            <h3>View All Athletes</h3>
            <div className="row">{athletesArrHtml}</div>
          </div>
        </div>
      </div>
    );
    return <Main children={ShowAllAthleteProfiles} />;
  }
}

module.exports = ShowAllAthleteProfiles;
