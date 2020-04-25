var React = require("react");
var Main = require("../MAIN");

class Register extends React.Component {
  render() {
    const Register = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3>New Membership Registration</h3>
            <p className="text-danger">
              <em>{this.props.comments}</em>
            </p>
            <form method="POST" action="/register">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="password"
                placeholder="Password"
                className="form-control"
              />
              <br></br>
              <input
                type="text"
                name="dp_url"
                placeholder="Display Picture URL"
                className="form-control"
              />
              <br></br>
              <input className="btn btn-primary" type="submit" value="Submit" />
              <br></br>
            </form>
          </div>
        </div>
      </div>
    );
    return <Main children={Register} />;
  }
}

module.exports = Register;
