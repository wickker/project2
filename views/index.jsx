var React = require("react");

class Home extends React.Component {
  render() {
    console.log(this.props.types);
    return (
      <html>
        <head />
        <body>
          <h3>Hello SEI-22</h3>
        </body>
        <script src="./script.js"></script>
      </html>
    );
  }
}

module.exports = Home;
