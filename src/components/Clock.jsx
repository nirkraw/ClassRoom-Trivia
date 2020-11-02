import React from "react";
import "../styles/Clock.css";

export default function Clock(props) {
  const [timer, setTimer] = React.useState();
  const id = React.useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      props.nextQuestion();
    } else {
      const animationStartCallback = () => {
        setTimer(30);
      };
      const question = document.getElementById("question-title-container");
      question.addEventListener("animationstart", animationStartCallback);
    }
  }, [timer]);

  return (
    <div>{timer < 0 ? <h1 id="clock">0</h1> : <h1 id="clock">{timer}</h1>}</div>
  );
}
