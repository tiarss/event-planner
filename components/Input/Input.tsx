import React from "react";
import handler from "../../pages/api/hello";
import style from "./Input.module.css";
import moment from "moment";
import { inputTextAreaType, inputTextPropsType } from "../../Types";

export const InputText = ({label, type, placeholder, onChange, value }: inputTextPropsType) => {

  return (
    <div className={style.input_custom}>
      <label htmlFor='input-text' className={style.input_label}>
        {label}
      </label>
      <input
        id='input-text'
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        className={style.input_text}
      />
    </div>
  );
};

export const InputTextArea = ({label, type, placeholder, onChange, value }: inputTextAreaType) => {
  return (
    <>
      <div className={style.input_custom}>
        <label htmlFor='input-textarea' className={style.input_label}>
          {label}
        </label>
        <textarea
          className={style.input_text}
          onChange={onChange}
          id='input-textarea'
          value={value}
          name='text-area'
          rows={4}
          cols={100}
          placeholder={placeholder}></textarea>
      </div>
    </>
  );
};
