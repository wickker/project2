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
              <p>You have successfully registered and paid!</p>
            </div>
          </div>
        </div>
      </div>
    );
    return <Main children={Success} />;
  }
}

module.exports = Success;
