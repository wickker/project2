var React = require("react");
var Main = require("../MAIN");
var DiscDropdown = require("./disc-sort-dropdown");

class sortDisc extends React.Component {
  render() {
    let dataArr = this.props.dataArr;
    let fields;

    let clubsHtml = dataArr.map((element) => {
      if (element.member_type_id === 2) {
        let link = element.club_website_url;
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
          <div className="mb-4 h3">
            Sorted By Discipline - {dataArr[0].type}
          </div>
          <div className="mb-4">
            <button className="button" id="view-clubs">
              Affiliated Clubs
            </button>
            <ol id="clubs-list" className="mt-3 list" hidden>
              {clubsHtml}
            </ol>
          </div>
          {/* <br></br> */}
          <div>
            <button className="button" id="view-athletes">
              Affiliated Athletes
            </button>
            <ol id="athletes-list" className="mt-3 list" hidden>
              {athHtml}
            </ol>
            <div id="admin-comment" className="mt-3 error-msg"></div>
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
            <div className="margin-div">
              <DiscDropdown />
            </div>

            <br></br>
            <div className="entry">{fields}</div>
          </div>
        </div>
        <script src="/script-sortdisc.js"></script>
      </div>
    );

    return <Main children={sortDisc} />;
  }
}

module.exports = sortDisc;
