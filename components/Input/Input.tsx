import React from "react";
import handler from "../../pages/api/hello";
import style from "./Input.module.css";

export const InputText = () => {

   //testing check tipe data
  const handleDate = (e: any) => {
    const date = e.target.value;
    const newDate = new Date(date);
    console.log(typeof date);
    console.log(newDate);
  };
  // end testing

  return (
    <div className={style.input_custom}>
      <label htmlFor='' className={style.input_label}>
        Name
      </label>
      <input
        onChange={handleDate}
        type='time'
        placeholder='Enter Name'
        className={style.input_text}
      />
    </div>
  );
};

export const InputTextArea = () =>{
   return (
      <>
         <div></div>
      </>
   )
}