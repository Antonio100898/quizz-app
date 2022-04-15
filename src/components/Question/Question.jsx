import React from "react";
import styles from "./Main.module.css";

const Question = ({
  question,
  correct_answer,
  incorrect_answers,
  setCorrect,
  setCorrectAnswersCount,
  correctAnswersCount,
  setDisabledNextButton,
  disabledNextButton,
  setFinish,
  currentQuestion,
  selectedAnswer,
  setSelectedAnswer,
  amount,
  setCurrentQuestion,
  correct,
  finish,
}) => {
  let joinedAnswers =
    incorrect_answers &&
    correct_answer &&
    incorrect_answers.concat(correct_answer).sort();

  const next = () => {
    if (correct) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
    if (currentQuestion === amount - 1) {
      setFinish(true);
    }
    setCorrect(undefined);
    if (!finish) {
      setCurrentQuestion(currentQuestion + 1);
    }
    setDisabledNextButton(true);
    setSelectedAnswer("");
  };

  const correctAnswerHandler = (e) => {
    setSelectedAnswer(e.target.value);
    setDisabledNextButton(false);
    if (e.target.value === correct_answer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div className={styles.question_block_wrapper}>
      <div className={styles.question}>{question && atob(question)}</div>
      <div className={styles.answers}>
        {joinedAnswers &&
          joinedAnswers.map((a) => (
            <div key={a}>
              <button
                className={
                  selectedAnswer === a
                    ? styles.answer + " " + styles.selected
                    : styles.answer
                }
                onClick={correctAnswerHandler}
                value={a}
              >
                {a && atob(a)}
              </button>
            </div>
          ))}
      </div>
      <div>
        {currentQuestion <= amount - 1 && (
          <button
            className={styles.button + " " + styles.next_button}
            disabled={disabledNextButton}
            onClick={next}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
