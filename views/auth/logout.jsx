var React = require("react");
var Main = require("../MAIN");

class Logout extends React.Component {
  render() {
    const Logout = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h5 className="text-success"><em>{this.props.comments}</em></h5>
            <br></br>

            <a className="btn btn-primary" href="/">
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
