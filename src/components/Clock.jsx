import React from "react";
import "../styles/Clock.css"

export default function Clock(props) {
  const [timer, setTimer] = React.useState(30);
//   const id = React.useRef(null);
//   const clear = () => {
//     window.clearInterval(id.current);
//   };
//   React.useEffect(() => {
//     id.current = window.setInterval(() => {
//       setTimer((time) => time - 1);
//     }, 1000);
//     return () => clear();
//   }, []);

//   React.useEffect(() => {
//     if (timer === 0) {
//       props.nextQuestion();
//       setTimer(30)
//     }
//   }, [timer]);

  return (
    <div>
      <h1 id="clock">{timer}</h1>
    </div>
  );
}
