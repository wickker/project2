var React = require("react");
var Main = require("../MAIN");
var DiscDropdown = require("./disc-sort-dropdown");

class sortDisc extends React.Component {
  render() {
    let clubsCount = this.props.clubsCount;
    let athCount = this.props.athCount;

    const sortDisc = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3>Summary Table</h3>
            <table class="table table-bordered table-dark">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Men's Artistic</th>
                  <th scope="col">Women's Artistic</th>
                  <th scope="col">Rhythmic</th>
                  <th scope="col">Trampoline</th>
                  <th scope="col">Acrobatic</th>
                  <th scope="col">Aerobic</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Affiliated Athletes</th>
                  <td>{athCount.mag}</td>
                  <td>{athCount.wag}</td>
                  <td>{athCount.rg}</td>
                  <td>{athCount.tramp}</td>
                  <td>{athCount.acro}</td>
                  <td>{athCount.aero}</td>
                </tr>
                <tr>
                  <th scope="row">Affiliated Clubs</th>
                  <td>{clubsCount.mag}</td>
                  <td>{clubsCount.wag}</td>
                  <td>{clubsCount.rg}</td>
                  <td>{clubsCount.tramp}</td>
                  <td>{clubsCount.acro}</td>
                  <td>{clubsCount.aero}</td>
                </tr>
                <tr>
                  <th scope="row">Total Members</th>
                  <td>{parseInt(clubsCount.mag) + parseInt(athCount.mag)}</td>
                  <td>{parseInt(clubsCount.wag) + parseInt(athCount.wag)}</td>
                  <td>{parseInt(clubsCount.rg) + parseInt(athCount.rg)}</td>
                  <td>
                    {parseInt(clubsCount.tramp) + parseInt(athCount.tramp)}
                  </td>
                  <td>{parseInt(clubsCount.acro) + parseInt(athCount.acro)}</td>
                  <td>{parseInt(clubsCount.aero) + parseInt(athCount.aero)}</td>
                </tr>
              </tbody>
            </table>
            <h6>View Details:</h6>
            <DiscDropdown />
          </div>
        </div>
        <script src="/script-sortdisc.js"></script>
      </div>
    );

    return <Main children={sortDisc} />;
  }
}

module.exports = sortDisc;
