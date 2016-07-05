import React from "react";

export default class TextContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  spanify() {
    var regularStyle = {
      color: "black",
      fontSize: 20,
      fontFamily: 'monospace'
    }
    var doneStyle = {
      color: "green",
      fontSize: 20,
      fontFamily: 'monospace'
    }
    var currentStyle = {
      color: "white",
      backgroundColor: "green",
      fontSize: 20,
      fontFamily: 'monospace'
    }
    let currentWordIndex = this.props.currentWordIndex;

    return this.props.wordArray.map(function (word, index) {
      let style;
      //all words are typed
      if (currentWordIndex === -1) {
        style = doneStyle;
      }
      else if (currentWordIndex === index) {
        style = currentStyle;
      }
      else if (index < currentWordIndex) {
        style = doneStyle;
      }
      else {
        style = regularStyle;
      }
      return (<span
        className='textSpan'
        style = {style}
        key={index}>{word}
      </span>)
    })
  }

  render() {
    return (
      <div id="wordContainer">
        {this.spanify() }
      </div>
    );
  }
}
