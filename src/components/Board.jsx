import React, { Component } from "react";
import Questions from "../assets/questions.json";
import "../styles/Board.css";
import OptionItem from "./OptionItem";
import Score from "./Score";
import Clock from "./Clock"; 
import mute from "../assets/mute.png";
import unmute from "../assets/unmute.png";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 20,
      score: 0,
      musicPlaying: false,
      endGame: false,
      options: [],
      animating: false,
    };

    this.incrementScore = this.incrementScore.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  startGame = () => {
    this.createOptions();
    this.animateRoundTransition();
  };


  animateRoundTransition() {
      const question = document.getElementById("question-title-container");
      const clock = document.getElementById("option-and-clock-container");

      
      question.classList.toggle("fade-in");
      clock.classList.toggle("fade-in");

      setTimeout(() => {
        question.classList.toggle("fade-in");
        clock.classList.toggle("fade-in");
        this.setState({ animating: false });
      }, 1500);

  }

  nextQuestion() {
    this.setState({animating: true});
    setTimeout(() => {
      this.animateRoundTransition();

      const newIdx = this.state.questionIdx + 1;
      if (newIdx === Questions.length) {
        const audio = document.getElementById("cheer");
        audio.volume = 0.5;
        audio.play();
        this.setState({ endGame: true });
      } else {
        this.setState({ questionIdx: newIdx, animating: false });
      }
      this.createOptions();
    }, 3000);
    
  }

  incrementScore() {
    const newScore = this.state.score + 1;
    this.setState({ score: newScore });
  }

  playMusic = () => {
    const audio = document.getElementById("theme");
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
    this.setState({ musicPlaying: true });
  };

  muteMusic = () => {
    const audio = document.getElementById("theme");
    audio.volume = 0;
    this.setState({ musicPlaying: false });
  };

  createOptions = () => {
    const options = Questions[this.state.questionIdx].incorrect;
    options.push(Questions[this.state.questionIdx].correct);
    options.sort(() => Math.random() - 0.5);
    this.setState({ options });
  };

  restartGame = () => {
    const audio = document.getElementById("cheer");
    audio.pause();
    audio.currentTime = 0;

    this.setState({
      questionIdx: 0,
      score: 0,
      endGame: false,
    } , () => this.startGame())
  };

  render() {
    const { endGame, score, questionIdx, musicPlaying, options } = this.state;

    const optionItems = options.map((option, i) => {
      let correct;
       if(option === Questions[this.state.questionIdx].correct) {
         correct = true;
       } else {
         correct = false;
       }
      return(
      <OptionItem
        option={option}
        key={i}
        correct={correct}
        answer={Questions[this.state.questionIdx].correct}
        incrementScore={this.incrementScore}
        nextQuestion={this.nextQuestion}
        animating={this.state.animating}
      />
    )});

    if (endGame)
      return (
        <div class="main-board-container">
          {musicPlaying ? (
            <img onClick={this.muteMusic} className="play-mute" src={unmute} />
          ) : (
            <img onClick={this.playMusic} className="play-mute" src={mute} />
          )}
          <h1 id="final-score">
            Final Score: {score}/{questionIdx }
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
            <Clock nextQuestion={this.nextQuestion} animating={this.state.animating} />
          </div>
        </div>
        <div id="score-main-container">
          <Score score={score} />
        </div>
      </div>
    );
  }
}
