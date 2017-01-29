class FairIsle extends React.Component {
  constructor(props) {
    super(props);
    var pattern = new Array(props.rows);
    for (var row = 0; row < props.rows; row++) {
      var stitches = new Array(props.stitches);
      for (var stitch = 0; stitch < props.stitches; stitch++) {
        stitches[stitch] = false;
      }
      pattern[row] = stitches;
    }

    this.state = { pattern: pattern };
    this.stitchClickHandler = this.stitchClickHandler.bind(this);
  }

  stitchClickHandler(row, stitch) {
    var pattern = this.state.pattern;
    pattern[row][stitch] = !pattern[row][stitch];
    this.setState({ pattern: pattern });
  }

  render() {
    return <Repeat rows={this.props.rows} stitches={this.props.stitches} pattern={this.state.pattern} clickedStitch={this.stitchClickHandler} />;
  }
}

class Repeat extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(row, stitch) {
    return () => {
      this.props.clickedStitch(row, stitch);
    }
  }

  render() {

    var rows = [];
    for (var row = 0; row < this.props.rows; row++) {
      var stitches = [];
      for (var stitch = 0; stitch < this.props.stitches; stitch++) {
        var el = <div onClick={this.clickHandler(row, stitch)}></div>;
        if (this.props.pattern[row][stitch]) {
          el = <div className="pattern-colour" onClick={this.clickHandler(row, stitch)}></div>;
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
