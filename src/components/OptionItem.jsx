import React, { Component } from "react";
import Optioncss from "../styles/Option.css";

export class OptionItem extends Component {
    constructor(props) {
        super(props)

        this.chooseOption = this.chooseOption.bind(this);
    }
    
  chooseOption(e) {
    if(this.props.answer === this.props.option) {
      e.target.classList.add("right");
      setTimeout(() => {
        e.target.classList.remove("right");
        this.props.rightAnswer();
      }, 3000);
    } else {
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
      </div>
    );
  }
}

export default OptionItem;
