import React from 'react';
import Scorecss from '../styles/Score.css'

export default function Score(props) {
    const score = props.score;
    let numOnes = score % 5;
    let numFives = (score - (score % 5)) / 5;

    let stringScore = "";
    for (let i = 0; i < numFives; i++) {
      stringScore += "V";
    }
    for (let i = 0; i < numOnes; i++) {
      stringScore += "I";
    }

    return (
      <div id="score-sub-container">
        <p>Score:</p>
        <p>{stringScore}</p>
      </div>
    );
}

