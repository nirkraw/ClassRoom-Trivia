import React, { Component } from "react";
import Questions from "../assets/questions.json";
import "../styles/Board.css";
import OptionItem from "./OptionItem";
import Score from "./Score";
import Clock from "./Clock";
import song from "../assets/background-music.mp3";
import mute from "../assets/mute.png";
import unmute from "../assets/unmute.png";
import cheer from "../assets/game-over.wav";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 0,
      score: 0,
      musicPlaying: false,
      endGame: false,
      options: [],
    };

    this.rightAnswer = this.rightAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.createOptions();
    this.animate();
  }

  animate() {
    const question = document.getElementById("question-title-container");
    const clock = document.getElementById("option-and-clock-container");
    question.classList.add("animate-opacity");
    clock.classList.add("animate-opacity");
  }

  nextQuestion() {
    this.animate();
    this.createOptions();
    const newIdx = this.state.questionIdx + 1;
    if (newIdx === Questions.length) {
      const audio = document.getElementById("cheer");
      audio.volume = 0.5;
      audio.play();
      this.setState({ endGame: true });
    } else this.setState({ questionIdx: newIdx });
  }

  rightAnswer() {
    const newScore = this.state.score + 1;
    this.setState({ score: newScore });
    this.nextQuestion();
  }

  play = () => {
    const audio = document.getElementById("theme");
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
    this.setState({ musicPlaying: true });
  };

  mute = () => {
    const audio = document.getElementById("theme");
    audio.volume = 0;
    this.setState({ musicPlaying: false });
  };

  createOptions = () => {
    const options = Questions[this.state.questionIdx].incorrect;
    options.push(Questions[this.state.questionIdx].correct);
    options.sort(() => Math.random() - 0.5);
    this.setState({ options });
    return options;
  };

  restartGame = () => {
    this.setState({
      questionIdx: 0,
      score: 0,
      musicPlaying: false,
      endGame: false,
    });
  };

  render() {
    const { endGame, score, questionIdx, musicPlaying, options } = this.state;

    const optionItems = options.map((option, i) => (
      <OptionItem
        option={option}
        key={i}
        answer={Questions[this.state.questionIdx].correct}
        rightAnswer={this.rightAnswer}
        nextQuestion={this.nextQuestion}
      />
    ));

    if (endGame)
      return (
        <div class="main-board-container">
          <h1 id="final-score">
            Final Score: {score}/{questionIdx - 1}
          </h1>
          <h1 onClick={this.restartGame} id="restart-game">
            Try Again?
          </h1>
        </div>
      );

    return (
      <div class="main-board-container">
        {musicPlaying ? (
          <img onClick={this.mute} className="play-mute" src={unmute} />
        ) : (
          <img onClick={this.play} className="play-mute" src={mute} />
        )}
        <audio id="theme" src={song}></audio>
        <audio id="cheer" src={cheer}></audio>
        <div id="question-title-container">
          <h1 id="question-text">
            {Questions[this.state.questionIdx].question}
          </h1>
        </div>
        <div id="option-and-clock-container">
          <div id="options-container">
            <ul id="options-ul">{optionItems}</ul>
          </div>
          <div id="clock-container">
            <Clock nextQuestion={this.nextQuestion} />
          </div>
        </div>
        <div id="score-main-container">
          <Score score={score} />
        </div>
      </div>
    );
  }
}
