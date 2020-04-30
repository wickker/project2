var React = require("react");
var Main = require("../MAIN");
var DiscDropdown = require("./disc-sort-dropdown");

class sortDisc extends React.Component {
  render() {
    let dataArr = this.props.dataArr;
    let fields;

    let clubsHtml = dataArr.map((element) => {
      if (element.member_type_id === 2) {
        let link = "/profiles/" + element.member_id;
        return (
          <li>
            <a href={link}>{element.full_name}</a>
          </li>
        );
      }
    });

    let athHtml = dataArr.map((element) => {
      if (element.member_type_id === 1) {
        let link = "/profiles/" + element.member_id;
        return (
          <li>
            <a href={link}>{element.full_name}</a>
          </li>
        );
      }
    });

    if (dataArr.length > 0) {
      fields = (
        <div>
          <h3>Sorted By Discipline - {dataArr[0].type}</h3>
          <div>
            <button id="view-clubs">Affiliated Clubs:</button>
            <ul id="clubs-list" hidden>
              {clubsHtml}
            </ul>
          </div>
          <br></br>
          <div>
            <button id="view-athletes">Affiliated Athletes:</button>
            <ul id="athletes-list" hidden>
              {athHtml}
            </ul>
            <div id="admin-comment"></div>
          </div>
        </div>
      );
    } else {
      fields = <p>This discipline has no affiliated clubs or athletes yet.</p>;
    }

    const sortDisc = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <DiscDropdown />
            {fields}
          </div>
        </div>
        <script src="/script-sortdisc.js"></script>
      </div>
    );

    return <Main children={sortDisc} />;
  }
}

module.exports = sortDisc;
