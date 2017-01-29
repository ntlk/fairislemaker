class FairIsle extends React.Component {
  constructor(props) {
    super(props);
    var pattern = new Array(props.rows);
    for (var row = 0; row < props.rows; row++) {
      var stitches = new Array(props.stitches);
      for (var stitch = 0; stitch < props.stitches; stitch++) {
        stitches[stitch] = Math.random() > 0.5;
      }
      pattern[row] = stitches;
    }

    this.state = { pattern: pattern };
  }

  render() {
    return <Repeat rows={this.props.rows} stitches={this.props.stitches} pattern={this.state.pattern} />;
  }
}

class Repeat extends React.Component {
  render() {

    var rows = [];
    for (var row = 0; row < this.props.rows; row++) {
      var stitches = [];
      for (var stitch = 0; stitch < this.props.stitches; stitch++) {
        var el = <div></div>;
        if (this.props.pattern[row][stitch]) {
          el = <div className="pattern-colour"></div>;
        }
        stitches.push(el);
      }
      rows.push(<li>{stitches}</li>);
    }
    return (
      <ol className="repeat">
        {rows}
      </ol>
    )
  }
}
