var React = require("react");
var Main = require("../MAIN");

class LoginDashboard extends React.Component {
  render() {
    const LoginDashboard = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3>Hello, {this.props.name}!</h3>
          </div>
        </div>
      </div>
    );
    return <Main children={LoginDashboard} />;
  }
}

module.exports = LoginDashboard;
