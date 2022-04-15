import React from "react";
import { Form, Field } from "react-final-form";
import styles from "./Main.module.css";

const FilterForm = ({ setUrl, setAmount }) => {
  const onSubmit = (e) => {
    const createUrl = () => {
      let instance = "https://opentdb.com/api.php?amount=" + e.amount;
      if (e.category) {
        instance = instance + "&category=" + e.category;
      } else if (e.difficulty) {
        instance = instance + "&difficulty=" + e.difficulty;
      }
      instance = instance + "&encode=base64";
      return instance;
    };
    setUrl(createUrl());
    setAmount(e.amount);
  };
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="amount">
              {({ input }) => (
                <select {...input} className={styles.form_field}>
                  <option value="0">Choose amount</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              )}
            </Field>
            <Field name="category">
              {({ input }) => (
                <select {...input} className={styles.form_field}>
                  <option>Choose category</option>
                  <option value="">Any category</option>
                  <option value="9">General knowledge</option>
                  <option value="10">Books</option>
                  <option value="11">Film</option>
                  <option value="12">Music</option>
                  <option value="13">Musicles & Theatres</option>
                  <option value="14">Television</option>
                  <option value="15">Video games</option>
                  <option value="16">Board games</option>
                  <option value="17">Science & Nature</option>
                  <option value="18">Science: computers</option>
                  <option value="19">Science: mathematics</option>
                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politic</option>
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                  <option value="27">Animals</option>
                  <option value="28">Vegicles</option>
                  <option value="29">Comics</option>
                  <option value="30">Science: gadjets</option>
                  <option value="31">Japanese Anime & Manga</option>
                  <option value="32">Cartoon & Animations</option>
                </select>
              )}
            </Field>
            <Field name="difficulty">
              {({ input }) => (
                <select {...input} className={styles.form_field}>
                  <option>Choose defficulty</option>
                  <option value="">any difficulty</option>
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
              )}
            </Field>
            <button type="submit">Save</button>
          </form>
        )}
      />
    </div>
  );
};

export default FilterForm;
