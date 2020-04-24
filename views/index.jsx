var React = require("react");

class Home extends React.Component {
  render() {
    console.log(this.props.types);
    return (
      <html>
        <head />
        <body>
          <h2>Hello SEI-22</h2>
          <button id="buttonD6">Click me to roll a D6</button>
          <button id="buttonD10">Click me to roll a D10</button>
          <h3 id="resultText">Result</h3>
        </body>
        <script src="./script.js"></script>
      </html>
    );
  }
}

module.exports = Home;
