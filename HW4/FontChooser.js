class FontChooser extends React.Component {
  constructor(props) {
    super(props);

    if (+props.min <= 0) {
      this.minSize = 1;
    } else {
      this.minSize = +props.min;
    }

    if (this.minSize > +props.max) {
      this.maxSize = this.minSize;
    } else {
      this.maxSize = +props.max;
    }

    if (!props.size) {
      this.size = 16;
    } else if (+props.size < this.minSize) {
      this.size = this.minSize;
    } else if (+props.size > this.maxSize) {
      this.size = this.maxSize;
    } else {
      this.size = +props.size;
    }

    this.state = {
      showControl: false,
      size: this.size,
      weight: props.bold == "true" ? "bold" : "normal"
    }
  }

  toggleControl() {
    this.setState({
      showControl: !this.state.showControl
    });
  }

  increaseSize() {
    if (this.state.size < this.maxSize) {
      this.setState({
        size: this.state.size + 1,
      })
    }
  }

  decreaseSize() {
    if (this.state.size > this.minSize) {
      this.setState({
        size: this.state.size - 1
      })
    }
  }

  defaultSize() {
    this.setState({
      size: this.size
    })
  }

  toggleBold() {
    if (this.state.weight == "normal") {
      this.setState({
        weight: "bold"
      })
    } else {
      this.setState({
        weight: "normal"
      })
    }
  }

  render() {
    let hidden = !this.state.showControl;
    let checked = this.state.weight == "bold";
    let color = (this.state.size == this.maxSize || this.state.size == this.minSize) ? "red" : "black";
    return(
      <div>
      <input type="checkbox" id="boldCheckbox" hidden={hidden} onChange={this.toggleBold.bind(this)} checked={checked}/>
      <button id="decreaseButton" hidden={hidden} onClick={this.decreaseSize.bind(this)}>-</button>
      <span id="fontSizeSpan" hidden={hidden} onDoubleClick={this.defaultSize.bind(this)} style={{ color: color }}>{this.state.size}</span>
      <button id="increaseButton" hidden={hidden} onClick={this.increaseSize.bind(this)}>+</button>
      <span id="textSpan" onClick={this.toggleControl.bind(this)} style={{ fontSize: this.state.size, fontWeight: this.state.weight }}>{this.props.text}</span>
      </div>
    );
  }
}
