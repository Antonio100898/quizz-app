import styles from "./App.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./components/Question/Question";
import FilterForm from "./components/Question/FilterForm";

function App() {
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correct, setCorrect] = useState(undefined);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [disabledNextButton, setDisabledNextButton] = useState(true);
  const [finish, setFinish] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [url, setUrl] = useState("");
  const [amount, setAmount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(async () => {
    if (localStorage.getItem("token") === null) {
      let response = await axios.get(
        "https://opentdb.com/api_token.php?command=request"
      );
      setToken(response.data.token);
      localStorage.setItem("token", JSON.stringify(response.data.token));
    } else {
      let localToken = JSON.parse(localStorage.getItem("token"));
      setToken(localToken);
    }
    if (localStorage.getItem("questions") !== null) {
      let localQuestions = JSON.parse(localStorage.getItem("questions"));
      setQuestions(localQuestions);
    }
    setAmount(0);
  }, []);

  const getQuestions = async () => {
    let response = await axios.get(
      "https://opentdb.com/api_token.php?command=request"
    );
    setToken(response.data.token);
    localStorage.setItem("token", JSON.stringify(response.data.token));
    let response2 = await axios.get(url + "&token=" + token);
    localStorage.setItem("questions", JSON.stringify(response2.data.results));
    let localQuestions = JSON.parse(localStorage.getItem("questions"));
    setQuestions(localQuestions);
    setCurrentQuestion(0);
    setCorrectAnswersCount(0);
    setStarted(true);
    setFinish(false);
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.topic}>Quizz App by Anton Mishanin</div>
        <button
          disabled={(!url || amount == 0 || amount == undefined) && true}
          className={styles.button + " " + styles.new_quizz_button}
          onClick={getQuestions}
        >
          Start new quizz
        </button>
      </div>
      <div className={styles.filter_form}>
        <FilterForm setAmount={setAmount} setUrl={setUrl} />
      </div>
      <div className={styles.question_block}>
        {questions.length > 0 && started && (
          <Question
            finish={finish}
            setCurrentQuestion={setCurrentQuestion}
            started={started}
            disabledNextButton={disabledNextButton}
            amount={amount}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            currentQuestion={currentQuestion}
            setFinish={setFinish}
            setDisabledNextButton={setDisabledNextButton}
            correctAnswersCount={correctAnswersCount}
            setCorrectAnswersCount={setCorrectAnswersCount}
            correct={correct}
            setCorrect={setCorrect}
            {...questions[currentQuestion]}
          />
        )}
        <div className={styles.completed_alert}>
          {finish && (
            <div>You got {correctAnswersCount} correct answers, well done!</div>
          )}
        </div>
      </div>
      {!finish && amount > 0 && started && (
        <div className={styles.completed_count}>
          {currentQuestion + 1} / {amount}{" "}
        </div>
      )}
    </div>
  );
}

export default App;
