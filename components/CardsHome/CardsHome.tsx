import React from "react";
import { cardsHomePropsType } from "../../Types";
import style from "./CardsHome.module.css";

export const CardsHome = ({
  title,
  image,
  location,
  date,
  onClick,
}: cardsHomePropsType) => {
  return (
    <>
      <div className={style.cards}>
        <div
          className={style.cards_image}
          style={{
            backgroundImage:
            `url(${image})`,
          }}></div>
        <div className={style.cards_body}>
          <h3 className={style.cards_title}>{title}</h3>
          <p className={style.cards_content}>{location}</p>
          <p className={style.cards_content}>{date}</p>
        </div>
      </div>
    </>
  );
};
