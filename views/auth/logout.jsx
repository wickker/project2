var React = require("react");
var Main = require("../MAIN");

class Logout extends React.Component {
  render() {
    const Logout = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <div className="mt-2"><p>{this.props.comments}</p></div>
            <br></br>
            <a className="button" href="/">
              Back To Home Page
            </a>
          </div>
        </div>
      </div>
    );
    return <Main children={Logout} />;
  }
}

module.exports = Logout;
