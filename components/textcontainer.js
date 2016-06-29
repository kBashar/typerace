import React from "react";

export default class TextContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  spanify() {
    var regularStyle = {
      color: "black"
    }
    var doneStyle = {
      color: "green",
    }
    var currentStyle = {
      color: "white",
      backgroundColor: "green"
    }
    let currentWordIndex = this.props.currentWordIndex;

    return this.props.wordArray.map(function (word, index) {
      let style;
      //all words are typed
      if(currentWordIndex === -1) {
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
        style = {style}
        key={index}>{word}
      </span>)
    })
  }

  render() {
    return (
      <div id="wordContainer">
        {this.spanify()}
      </div>
    );
  }
}
