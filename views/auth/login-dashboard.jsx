var React = require("react");
var Main = require("../MAIN");

class Home extends React.Component {
  render() {
    const Home = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3><em>Public View</em></h3>
          </div>
        </div>
      </div>
    );
    return <Main children={Home} />;
  }
}

module.exports = Home;
