import React from "react";
import { cardsCommentPropsType } from "../../Types";
import { ButtonSecondary, ButtonTertier } from "../Button/Button";
import style from "./CardsComment.module.css";

export const CardsComment = ({
  image,
  name,
  comment,
  isUser,
  onDelete,
  onUpdate,
}: cardsCommentPropsType) => {
  console.log(isUser);
  return (
    <>
      <div className={style.cards}>
        <img src={image} className={style.cards_image} />
        <div className={style.dtl_col}>
          <div className={style.cards_body}>
            <p>{name}</p>
            <div className={style.comments}>
              <p>{comment}</p>
            </div>
          </div>
          <div
            style={{ display: isUser ? "flex" : "none" }}
            className={style.button_comments}>
            <ButtonSecondary title='Edit' onClick={onUpdate} />
            <ButtonTertier title='Delete' onClick={onDelete} />
          </div>
        </div>
      </div>
    </>
  );
};
