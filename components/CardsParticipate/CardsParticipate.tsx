import React from "react";
import style from "./CardsParticipate.module.css";
import { BiTargetLock, BiCalendar, BiInfoCircle } from "react-icons/bi";
import { cardsParticipateType } from "../../Types";
import moment from "moment";
import { ButtonPrimary, ButtonTertier } from "../Button/Button";
export const CardsParticipate = ({
  name,
  location,
  image,
  date,
  onClick,
}: cardsParticipateType) => {
  const convertDate = moment(date).format("YYYY MMM D, hh:mm ") + "WIB";

  return (
    <>
      <div className={style.participate_cards}>
        <div
          className={style.image_event}
          style={{
            backgroundImage: `url(${image})`,
          }}></div>
        <div className="w-75">
          <p className={style.title}>{name}</p>
          <p className={style.cards_head}>Location</p>
          <p className='d-flex align-items-center gap-1'>
            <BiTargetLock />
            {location}
          </p>
          <p className={style.cards_head}>Date</p>
          <p className='d-flex align-items-center gap-1'>
            <BiCalendar />
            {convertDate}
          </p>
          <div className="d-flex justify-content-end">
            <ButtonTertier title='Quit Event' onClick={onClick} />
          </div>
        </div>
      </div>
    </>
  );
};
