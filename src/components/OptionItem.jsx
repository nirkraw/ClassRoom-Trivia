import React, { Component } from "react";
import Optioncss from "../styles/Option.css";

export class OptionItem extends Component {
    constructor(props) {
        super(props)
    
        this.chooseOption = this.chooseOption.bind(this);
    }
    
  chooseOption() {
    if(this.props.answer === this.props.option) {
        this.props.rightAnswer();
    } else {
        this.props.nextQuestion();
    }
  }

  render() {
    return (
      <div className="option-container">
        <h1 onClick={this.chooseOption} className="option-text">
          -{this.props.option}
        </h1>
      </div>
    );
  }
}

export default OptionItem;
