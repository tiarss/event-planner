import React from "react";
import { cardsCommentPropsType } from "../../Types";
import style from "./CardsComment.module.css";

export const CardsComment = ({
  image,
  name,
  comment,
}: cardsCommentPropsType) => {
  return (
    <>
      <div className={style.cards}>
        <div className={style.img_col}>
          <img
            src={image}
            className={style.cards_image}/>
        </div>
        <div className={style.dtl_col}>
          <div className={style.cards_body}>
            <p>{name}</p>
            <p>{comment}</p>
          </div>
        </div>
      </div>
    </>
  );
};
