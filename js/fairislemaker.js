class Pattern {
  constructor(rows, stitches) {
    this.rows = rows;
    this.stitches = stitches;
    this.data  = new Array(this.rows);
    for (var row = 0; row < this.rows; row++) {
      var stitches = new Array(this.stitches);
      for (var stitch = 0; stitch < this.stitches; stitch++) {
        stitches[stitch] = false;
      }
      this.data[row] = stitches;
    }
  }

  getStitch(rowNumber, stitchNumber) {
    return this.data[rowNumber][stitchNumber];
  }

  toggleStitch(rowNumber, stitchNumber) {
    this.data[rowNumber][stitchNumber] = !this.data[rowNumber][stitchNumber];
  }
}

class FairIsle extends React.Component {
  constructor(props) {
    super(props);
    var pattern = new Pattern(props.rows, props.stitches);
    this.state = { pattern };
    this.stitchClickHandler = this.stitchClickHandler.bind(this);
  }

  stitchClickHandler(row, stitch) {
    var pattern = this.state.pattern;
    pattern.toggleStitch(row, stitch);
    this.setState({ pattern });
  }

  render() {
    return <Repeat pattern={this.state.pattern} clickedStitch={this.stitchClickHandler} />;
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
    for (var row = 0; row < this.props.pattern.rows; row++) {
      var stitches = [];
      for (var stitch = 0; stitch < this.props.pattern.stitches; stitch++) {
        var el = <div onClick={this.clickHandler(row, stitch)}></div>;
        if (this.props.pattern.getStitch(row, stitch)) {
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
