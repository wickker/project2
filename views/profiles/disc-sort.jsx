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
          <button>Affiliated Clubs:</button>
          <ul>{clubsHtml}</ul>
          <button>Affiliated Athletes:</button>
          <ul>{athHtml}</ul>
        </div>
      );
    } else {
      fields = <p>This discipline has no affiliated clubs or athletes yet.</p>;
    }

    const sortDisc = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            {/* <h6>Select Discipline To Sort By:</h6> */}
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
