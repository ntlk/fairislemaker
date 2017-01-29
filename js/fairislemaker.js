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

var Repeat = ({ patternRepeat, clickedStitch }) =>
  <ol className="repeat">
    {
      _.times(patternRepeat.rows, row =>
        <li>
          {
            _.times(patternRepeat.stitches, stitch =>
              <div
                onClick={() => clickedStitch(row, stitch)}
                className={stitchClass(patternRepeat, row, stitch)}>
              </div>
            )
          }
        </li>
      )
    }
  </ol>;

var stitchClass = (patternRepeat, row, stitch) => {
  if (patternRepeat.getStitch(row, stitch)) {
     return 'pattern-colour';
  } else {
    return null;
  }
}
