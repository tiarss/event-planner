import React from "react";
import handler from "../../pages/api/hello";
import style from "./Input.module.css";
import moment from "moment";
import { inputTextAreaType, inputTextPropsType } from "../../Types";

export const InputText = ({label, type, placeholder, onChange }: inputTextPropsType) => {

  return (
    <div className={style.input_custom}>
      <label htmlFor='input-text' className={style.input_label}>
        {label}
      </label>
      <input
        id='input-text'
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={style.input_text}
      />
    </div>
  );
};

export const InputTextArea = ({label, type, placeholder, onChange }: inputTextAreaType) => {
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
          name='text-area'
          rows={4}
          cols={50}
          placeholder={placeholder}></textarea>
      </div>
    </>
  );
};
