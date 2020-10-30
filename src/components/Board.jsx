import React, { Component } from "react";
import Questions from "../assets/questions.json";
import Boardcss from "../styles/Board.css";
import OptionItem from "./OptionItem";
import Score from "./Score"
import Clock from "./Clock";
import song from "../assets/background-music.mp3";


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 0,
      score: 0,
    };

    this.rightAnswer = this.rightAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {}

  nextQuestion() {
    const newIdx = this.state.questionIdx + 1;
    if (newIdx === Questions.length) this.endGame();
    else this.setState({ questionIdx: newIdx });
  }

  rightAnswer() {
    const newScore = this.state.score + 1;
    this.setState({ score: newScore });
    this.nextQuestion();
  }

  endGame() {}

  getRandomizedOptions(currQuestion) {
    const options = currQuestion.incorrect;
    options.push(currQuestion.correct);
    options.sort(() => Math.random() - 0.5);
    return options;
  }

  
  render() {
    const currQuestion = Questions[this.state.questionIdx];
    const options = this.getRandomizedOptions(currQuestion).map((option, i) => (
      <OptionItem
        option={option}
        key={i}
        answer={currQuestion.correct}
        rightAnswer={this.rightAnswer}
        nextQuestion={this.nextQuestion}
      />
    ));

    return (
      <div id="main-board-container">
        <audio id="theme" src={song}></audio>
        <div id="question-title-container">
          <h1 id="question-text">{currQuestion.question}</h1>
        </div>
        <div id="option-and-clock-container">
          <div id="options-container">
            <ul id="options-ul">{options}</ul>
          </div>
          <div id="clock-container">
            <Clock nextQuestion={this.nextQuestion} />
          </div>
        </div>
        <div id="score-main-container">
          <Score score={this.state.score}/>
        </div>
      </div>
    );
  }
}
