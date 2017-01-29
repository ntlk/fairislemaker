class FairIsle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pattern: "this is the pattern" };
  }

  render() {
    return <Repeat rows={this.props.rows} stitches={this.props.stitches} pattern={this.state.pattern} />;
  }
}

class Repeat extends React.Component {
  render() {

    var rows = [];
    for (var row = 0; row < this.props.rows; row++) {
      rows.push(<li>a row</li>)
    }
    return (
      <ol>
        {rows}
      </ol>
    )
  }
}
