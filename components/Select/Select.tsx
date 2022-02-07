import React from "react";
import { inputSelectPropsType } from "../../Types";
import style from "./Select.module.css";

export const InputSelect = ({
  label,
  option,
  onChange
}: inputSelectPropsType) => {

  // testing check tipe data
  const handleSelect = (e: any) => {
    const selection = e.target.value;
    return selection;
  };
  // end testing

  return (
    <div className={style.input_custom}>
      <label htmlFor='' className={style.input_label}>
        Name
      </label>
      <select
        onChange={handleSelect}
        placeholder="test"
        className={style.input_text}>
        {option?.map((opt:any, index: number) => (
          <option value={opt} key={index}>{opt}</option>
        ))}
      </select>
    </div>
  );
};
