var React = require("react");

class DiscDropdown extends React.Component {
  render() {
    return (
      <select id="discipline-type" name="discipline-type" className="custom-select input">
        <option value="">Select Discipline To Sort By</option>
        <option value="1">Men's Artistic</option>
        <option value="2">Women's Artistic</option>
        <option value="3">Rhythmic</option>
        <option value="4">Trampoline</option>
        <option value="5">Acrobatics</option>
        <option value="6">Aerobic</option>
      </select>
    );
  }
}

module.exports = DiscDropdown;
