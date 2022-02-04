import React from "react";
import handler from "../../pages/api/hello";
import style from "./Input.module.css";
import moment from "moment";

export const InputText = () => {
  //testing check tipe data
  const handleDate = (e: any) => {
    const date = e.target.value;
    const newDate = new Date(date);
    const newsDate = moment(newDate).format()
    console.log(newsDate)
  };
  // end testing

  return (
    <div className={style.input_custom}>
      <label htmlFor='input-text' className={style.input_label}>
        Name
      </label>
      <input
        id='input-text'
        onChange={handleDate}
        type='datetime-local'
        placeholder='Enter Name'
        className={style.input_text}
      />
    </div>
  );
};

export const InputTextArea = () => {
  return (
    <>
      <div className={style.input_custom}>
        <label htmlFor='input-textarea' className={style.input_label}>
          Name
        </label>
        <textarea
          className={style.input_text}
          id='input-textarea'
          name='text-area'
          rows={4}
          cols={50}
          placeholder='Enter Description'></textarea>
      </div>
    </>
  );
};
