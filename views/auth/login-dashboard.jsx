var React = require("react");
var Main = require("../MAIN");

class LoginDashboard extends React.Component {
  render() {
    const LoginDashboard = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <div className="hello mt-4"><em>Hello,</em></div>
            <div className="h1 mt-4">{this.props.name}</div>
          </div>
        </div>
      </div>
    );
    return <Main children={LoginDashboard} />;
  }
}

module.exports = LoginDashboard;
