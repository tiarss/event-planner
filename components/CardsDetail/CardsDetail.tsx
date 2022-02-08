import React from "react";
import { cardsDetailPropsType } from "../../Types";
import style from "./CardsDetail.module.css";
import { ButtonPrimary } from "../Button/Button";
import { 
  BiTargetLock, 
  BiCalendar, 
  BiInfoCircle,
  BiBrush,
  BiMobile,
  BiFootball,
  BiMusic,
  BiBook } from 'react-icons/bi';

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
          <p className="d-flex align-items-center"><BiTargetLock className={style.icon_alignment}/>&nbsp;{location}</p>
          <h5>Date</h5>
          <p className="d-flex align-items-center"><BiCalendar className={style.icon_alignment}/>&nbsp;{date}</p>
          <h5>Category</h5>
          {(category == "Art")
            ? <p className="d-flex align-items-center"><BiBrush className={style.icon_alignment}/>&nbsp;{category}</p>
            : (category == "Technology")
              ? <p className="d-flex align-items-center"><BiMobile className={style.icon_alignment}/>&nbsp;{category}</p>
              : (category == "Sports")
                ? <p className="d-flex align-items-center"><BiFootball className={style.icon_alignment}/>&nbsp;{category}</p>
                : (category == "Music")
                  ? <p className="d-flex align-items-center"><BiMusic className={style.icon_alignment}/>&nbsp;{category}</p>
                  : <p className="d-flex align-items-center"><BiBook className={style.icon_alignment}/>&nbsp;{category}</p>}
          <div className={style.button_alignment}>
            <ButtonPrimary title="Join" onClick={onJoin} disabled={!canJoin}/>
          </div>
        </div>
      </div>
    </>
  );
};
