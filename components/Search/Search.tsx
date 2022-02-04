import React from "react";
import { inputSearchPropsType } from "../../Types";
import { ButtonPrimary } from "../Button/Button";
import style from "./Search.module.css";

export const Search = ({
  label,
  onChange
}: inputSearchPropsType) => {
  label="search";

  const handleSearch = (e: any) => {
    const searchKey = e.target.value;
    return searchKey;
  };

  return (
    <div className={style.input_custom}>
      <input
        onChange={handleSearch}
        type='text'
        placeholder='Enter event name or location'
        className={style.input_text}
      />
      <span
        className={style.search_button}>
        <ButtonPrimary title="Search"/>
      </span>
    </div>
  );
};