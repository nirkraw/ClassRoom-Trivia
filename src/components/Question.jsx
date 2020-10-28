import React, { Component } from "react";
import Questions from "../assets/questions.json";
import Questioncss from "../styles/Question.css";
import OptionItem from "./OptionItem";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIdx: 0,
      score: 0,
    };
  
    this.incrementScore = this.incrementScore.bind(this);
  }

  nextQuestion() {
    const newIdx= this.state.questionIdx + 1;
    if(newIdx === Questions.length) this.endGame();
    else this.setState({ questionIdx: newIdx});
  }

  endGame() {
    
  }

  incrementScore() {
    const newScore = this.state.score + 1; 
    this.setState({score: newScore});
    this.nextQuestion();
  }

  getRandomizedOptions(currQuestion) {
    const options = currQuestion.incorrect;
      options.push(currQuestion.correct)
      options.sort(() => Math.random() - 0.5);
      return options;
  }

  formatScore() {
    const score = this.state.score;
    let numOnes = score % 5;
    let numFives = (score - (score % 5)) / 5;

    let stringScore = "";
    for(let i = 0; i < numFives; i++) {
      stringScore += "V";
    }
    for (let i = 0; i < numOnes; i++) {
      stringScore += "I";
    }

    return stringScore;
  }

  render() {
    const currQuestion = Questions[this.state.questionIdx];
    const options = this.getRandomizedOptions(currQuestion).map((option, i) => (
      <OptionItem
        option={option}
        key={i}
        answer={currQuestion.correct}
        incrementScore = {this.incrementScore}
      />
    ));

    const score = this.formatScore();

    return (
      <div id="main-question-div">
        <h1 id="question-title">{currQuestion.question}</h1>
        <div>
          <ul className="options-div">{options}</ul>
        </div>
        <div id="score-div">
          <p>Score:</p>
          <p>{score}</p>
        </div>
      </div>
    );
  }
}