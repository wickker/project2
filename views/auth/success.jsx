var React = require("react");
var Main = require("../MAIN");

class Success extends React.Component {
  render() {
    const Success = (
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <div className="text-center">
              <img
                src="http://getdrawings.com/free-icon/green-thumbs-up-icon-67.png"
                height="150px"
                width="150px"
                alt="Green tick image"
              ></img>
              <br></br>
              <br></br>
              <h5>
                <em>You have successfully registered and paid!</em>
              </h5>
              <h5>
                <em>Please proceed to login.</em>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
    return <Main children={Success} />;
  }
}

module.exports = Success;
