class PatternRepeat {
  constructor(rows, stitches) {
    this.rows = rows;
    this.stitches = stitches;
    this.data = _.times(rows, () => _.times(stitches, () => false));
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
    var patternRepeat = new PatternRepeat(props.rows, props.stitches);
    this.state = { patternRepeat };
    this.stitchClickHandler = this.stitchClickHandler.bind(this);
  }

  stitchClickHandler(row, stitch) {
    var patternRepeat = this.state.patternRepeat;
    patternRepeat.toggleStitch(row, stitch);
    this.setState({ patternRepeat });
  }

  render() {
    return <Repeat patternRepeat={this.state.patternRepeat} clickedStitch={this.stitchClickHandler} />;
  }
}

var Repeat = (props) => {
  var rows = _.times(props.patternRepeat.rows, row => {
    var stitches = _.times(props.patternRepeat.stitches, stitch => {
      var classes = '';
      if (props.patternRepeat.getStitch(row, stitch)) {
        classes = 'pattern-colour';
      }
      return <div onClick={() => props.clickedStitch(row, stitch)} className={classes}></div>;
    });

    return <li>{stitches}</li>;
  });

  return (
    <ol className="repeat">
      {rows}
    </ol>
  )
}
