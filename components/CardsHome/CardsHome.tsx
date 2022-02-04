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
              "url(https://asset.kompas.com/crops/KwgrhXBTh3P8uTQwfNT9LDa7ETU=/0x66:1059x772/750x500/data/photo/2019/10/03/5d9585b4b313c.jpg)",
          }}></div>
        <div className={style.cards_body}>
          <h3 className={style.cards_title}>Event Handling</h3>
          <p className={style.cards_content}>Surabaya, Jawa Timur</p>
          <p className={style.cards_content}>2022 Feb 18, 18:00 WIB</p>
        </div>
      </div>
    </>
  );
};
