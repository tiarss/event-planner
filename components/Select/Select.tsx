import React from "react";
import { inputSelectPropsType } from "../../Types";
import style from "./Select.module.css";

export const InputSelect = ({
  label,
  option,
  id,
  onChange,
}: inputSelectPropsType) => {
  return (
    <div className={style.input_custom}>
      <label htmlFor='' className={style.input_label}>
        {label}
      </label>
      <select
        onChange={onChange}
        value={id}
        placeholder='Category'
        className={style.input_text}>
        <option value={1}>Arts</option>
        <option value={2}>Technology</option>
        <option value={3}>Sports</option>
        <option value={4}>Music</option>
        <option value={5}>Education</option>
      </select>
    </div>
  );
};
