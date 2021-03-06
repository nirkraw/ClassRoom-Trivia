import React, { Component } from "react";
import QuestionsData from "../assets/questions.json";
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
      questions: [],
      questionIdx: 0,
      score: 0,
      musicPlaying: false,
      gamePhase: "start",
      options: [],
      animating: false,
    };
  }

  componentDidMount() {
    this.createQuestions();
  }

  startGame = () => {
    this.setState({ gamePhase: "game" }, () => {
      this.createOptions();
      this.animateRoundTransition();
    });
  };

  createQuestions = () => {
    const questions = [];
    while (questions.length < 10) {
      let randNum = Math.ceil(Math.random() * 10);
      if (!questions.includes(QuestionsData[randNum])) {
        questions.push(QuestionsData[randNum]);
      }
    }

    this.setState({ questions });
  };

  animateRoundTransition() {
    //allows for the animation fade-in between rounds
    const question = document.getElementById("question-title-container");
    const clock = document.getElementById("option-and-clock-container");

    const animationEndCallback = () => {
      question.removeEventListener("animationend", animationEndCallback);
      question.classList.toggle("fade-in");
      clock.removeEventListener("animationend", animationEndCallback);
      clock.classList.toggle("fade-in");
    };

    question.addEventListener("animationend", animationEndCallback);
    question.classList.toggle("fade-in");
    clock.classList.toggle("fade-in");
  }

  nextQuestion = () => {
    this.setState({ animating: true }); //sent down to options prop to show right answer
    setTimeout(() => {
      this.animateRoundTransition();
      if (this.state.questionIdx === 9) {
        const audio = document.getElementById("cheer");
        audio.volume = 0.5;
        audio.play();
        this.setState({ gamePhase: "end" });
      } else {
        this.setState(
          { questionIdx: this.state.questionIdx + 1, animating: false },
          () => this.createOptions()
        );
      }
    }, 3000); //settimeout gives the viewer a few seconds to view the question results
  };

  incrementScore = () => {
    this.setState({ score: this.state.score + 1 });
  };

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
    //merges the correct and incorrect options and shuffles
    const options = this.state.questions[this.state.questionIdx].incorrect;
    options.push(this.state.questions[this.state.questionIdx].correct);
    options.sort(() => Math.random() - 0.5);
    this.setState({ options });
  };

  restartGame = () => {
    const audio = document.getElementById("cheer");
    audio.pause();
    audio.currentTime = 0;
    this.setState(
      {
        questionIdx: 0,
        score: 0,
        gamePhase: "game",
        animating: false,
      },
      () => {
        this.createQuestions();
        this.startGame();
      }
    );
  };

  render() {
    const {
      gamePhase,
      score,
      animating,
      questionIdx,
      musicPlaying,
      options,
      questions,
    } = this.state;

    const viewedOptions = new Set(); 
    const optionItems = options.map((option, i) => {
      let correct;
      if (option === questions[this.state.questionIdx].correct) {
        correct = true;
      } else {
        correct = false;
      }
      if (viewedOptions.has(option)) return; //in order to ensure option uniqueness
      viewedOptions.add(option);

      return (
        <OptionItem
          option={option}
          key={i}
          correct={correct}
          answer={questions[questionIdx].correct}
          incrementScore={this.incrementScore}
          nextQuestion={this.nextQuestion}
          animating={animating}
        />
      );
    });

    const music = musicPlaying ? (
      <img onClick={this.muteMusic} className="play-mute" src={unmute} />
    ) : (
      <img onClick={this.playMusic} className="play-mute" src={mute} />
    );

    if (gamePhase === "end")
      return (
        <div class="main-board-container">
          {music}
          <h1 id="final-score">
            Final Score: {score}/{10}
          </h1>
          <h1 onClick={this.restartGame} id="menu-title">
            Try Again?
          </h1>
        </div>
      );

    if (gamePhase === "start") {
      return (
        <div class="main-board-container">
          {music}
          <h1 id="opening-title">Are you ready for some trivia?</h1>
          <h1 onClick={this.startGame} id="start-game">
            Yes!
          </h1>
        </div>
      );
    }

    return (
      <div class="main-board-container">
        {music}
        <div id="question-title-container">
          <h1 id="question-text">{questions[questionIdx].question}</h1>
        </div>
        <div id="option-and-clock-container">
          <div id="options-container">
            <ul id="options-ul">{optionItems}</ul>
          </div>
          <div id="clock-container">
            <Clock nextQuestion={this.nextQuestion} animating={animating} />
          </div>
        </div>
        <div id="score-main-container">
          <Score score={score} />
        </div>
      </div>
    );
  }
}
