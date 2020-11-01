import React from 'react';
import song from "../assets/background-music.mp3";
import cheer from "../assets/game-over.wav";
import rightSound from "../assets/right.wav";
import wrongSound from "../assets/wrong.wav";

export default function Audio() {
    return (
      <div>
        <audio id="theme" src={song}></audio>
        <audio id="cheer" src={cheer}></audio>
        <audio id="right-sound" src={rightSound}></audio>
        <audio id="wrong-sound" src={wrongSound}></audio>
      </div>
    );
}
