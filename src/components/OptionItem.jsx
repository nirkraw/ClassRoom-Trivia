import React, { Component } from "react";
import "../styles/Option.css";
import rightSound from "../assets/right.wav";
import wrongSound from "../assets/wrong.wav";

export class OptionItem extends Component {
  constructor(props) {
    super(props);

    this.chooseOption = this.chooseOption.bind(this);
  }

  chooseOption(e) {
    const question = document.getElementById("question-title-container");
    const clock = document.getElementById("option-and-clock-container");
    question.classList.remove("animate-opacity");
    clock.classList.remove("animate-opacity");
  
    if (this.props.answer === this.props.option) {
      e.target.classList.add("right");
      const audio = document.getElementById("right-sound");
      audio.volume = 0.5;
      audio.play();
      setTimeout(() => {
        e.target.classList.remove("right");
        this.props.rightAnswer();
      }, 3000);
    } else {
      const audio = document.getElementById("wrong-sound");
      audio.volume = 0.5;
      audio.play();
      e.target.classList.add("wrong");
      setTimeout(() => {
        e.target.classList.remove("wrong");
        this.props.nextQuestion();
      }, 3000);
    }
  }

  render() {
    return (
      <div className="option-container">
        <h1 onClick={this.chooseOption} className="option-text">
          - {this.props.option}
        </h1>
        <audio id="right-sound" src={rightSound}></audio>
        <audio id="wrong-sound" src={wrongSound}></audio>
      </div>
    );
  }
}

export default OptionItem;
