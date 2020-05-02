var React = require("react");
var Main = require("./MAIN");

class Home extends React.Component {
  render() {
    const Home = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h3 className="mb-4">Public Homepage</h3>
            <div className="row">
              <div className="col-6">
                <h5 className="mb-3">NEW MEMBERSHIP:</h5>
                <a href="/register" className="btn btn-info">
                  Register Here!
                </a>
              </div>
              <div className="col-6">
                <form method="POST" action="/">
                  <h5 className="mb-3">EXISTING MEMBERS:</h5>
                  <p className="text-danger">
                    <em>{this.props.comments}</em>
                  </p>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                  <br></br>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    required
                  />
                  <br></br>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Login"
                  />
                  <br></br>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col mt-4">
                <h3 className="mb-4">Welcome To Gymnastics DB!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return <Main children={Home} />;
  }
}

module.exports = Home;
