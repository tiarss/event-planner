import React from "react";
import { cardsDetailPropsType } from "../../Types";
import style from "./CardsDetail.module.css";
import { ButtonPrimary } from "../Button/Button";
import { BiTargetLock, BiCalendar, BiInfoCircle } from 'react-icons/bi';

export const CardsDetail = ({
  location,
  date,
  category,
  onJoin,
  canJoin
}: cardsDetailPropsType) => {
  return (
    <>
      <div className={style.cards}>
        <div className={style.cards_body}>
          <h5>Location</h5>
          <p><BiTargetLock className={style.icon_alignment}/>&nbsp;{location}</p>
          <h5>Date</h5>
          <p><BiCalendar className={style.icon_alignment}/>&nbsp;{date}</p>
          <h5>Category</h5>
          <p><BiInfoCircle className={style.icon_alignment}/>&nbsp;{category}</p>
          <div className={style.button_alignment}>
            <ButtonPrimary title="Join" onClick={onJoin} disabled={!canJoin}/>
          </div>
        </div>
      </div>
    </>
  );
};
