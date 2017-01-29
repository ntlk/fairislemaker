class PatternRepeat {
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
  var clickHandler = (row, stitch) => {
    return () => {
      props.clickedStitch(row, stitch);
    }
  }

  var rows = [];
  _.times(props.patternRepeat.rows, row => {
    var stitches = [];
    _.times(props.patternRepeat.stitches, stitch => {
      var classes = '';
      if (props.patternRepeat.getStitch(row, stitch)) {
        classes = 'pattern-colour';
      }
      stitches.push(<div onClick={clickHandler(row, stitch)} className={classes}></div>);
    });

    rows.push(<li>{stitches}</li>);
  });

  return (
    <ol className="repeat">
      {rows}
    </ol>
  )
}
