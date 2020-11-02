import React, { Component } from "react";
import "../styles/Option.css";

export class OptionItem extends Component {
  chooseOption = () => {
    if (this.props.answer === this.props.option) {
      const audio = document.getElementById("right-sound");
      audio.volume = 0.5;
      audio.play();
      this.props.incrementScore();
    } else {
      const audio = document.getElementById("wrong-sound");
      audio.volume = 0.5;
      audio.play();
    }
    this.props.nextQuestion();
  };

  render() {
    let { correct, animating } = this.props;

    return (
      <div className="option-container">
        {animating ? (
          <h1 className={`option-text correct-${correct}`}>
            - {this.props.option}
          </h1>
        ) : (
          <h1 onClick={this.chooseOption} className="option-text hoverable">
            - {this.props.option}
          </h1>
        )}
      </div>
    );
  }
}

export default OptionItem;
