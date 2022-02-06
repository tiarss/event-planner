import React from "react";
import { inputSearchPropsType } from "../../Types";
import { ButtonPrimary } from "../Button/Button";
import style from "./SearchBar.module.css";

export const SearchBar = ({
  label,
  onChange
}: inputSearchPropsType) => {
  label="search";

  return (
    <div className={style.input_custom}>
      <input
        onChange={onChange}
        type='text'
        placeholder='Enter event name or location'
        className={style.input_text}
      />
    </div>
  );
};