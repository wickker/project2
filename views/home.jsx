var React = require("react");
var Main = require("./MAIN");

class Home extends React.Component {
  render() {
    const Home = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <div id="tag-line">
              <div>
                Total Club Members: <span>{this.props.clubs}</span>
              </div>
              <div>
                Total Athlete Members: <span>{this.props.athletes}</span>
              </div>
            </div>
            <div className="row">
              <div className="col entry">
                <div className="mb-4 login-font">New Membership</div>
                
                <div>
                  <a href="/register" className="button">
                    Register
                  </a>
                </div>
              </div>
              <div className="col entry">
                <form method="POST" action="/">
                  <div className="mb-3 login-font">
                    Existing Members / Admin Login
                  </div>
                  <p className="error-msg">{this.props.comments}</p>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control input"
                    required
                  />
                  <br></br>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control input"
                    required
                  />
                  <br></br>
                  <button className="button" type="submit">
                    Login
                  </button>
                  <br></br>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col mt-4">
                {/* <h3 className="mb-4">Welcome To Gymnastics DB!</h3> */}
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
