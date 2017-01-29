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

var Repeat = props =>
  <ol className="repeat">
    {
      _.times(props.patternRepeat.rows, row =>
        <li>
          {
            _.times(props.patternRepeat.stitches, stitch =>
              <div
                onClick={() => props.clickedStitch(row, stitch)}
                className={stitchClass(props.patternRepeat, row, stitch)}>
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
