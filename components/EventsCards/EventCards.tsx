import React from "react";
import { Accordion } from "react-bootstrap";
import { BiTargetLock, BiCalendar, BiInfoCircle } from "react-icons/bi";
import { cardsEventType } from "../../Types";
import { ButtonSecondary, ButtonTertier } from "../Button/Button";
import style from "./EventCards.module.css";
import moment from "moment";

export const EventCards = ({
  title,
  image,
  location,
  date,
  category,
  description,
  quota,
  onEdit,
  onDelete
}: cardsEventType) => {
  const convertDate = moment(date).format("YYYY MMM D, hh:mm ") + "WIB";

  return (
    <div>
      <style type='text/css'>
        {`.accordion-button{
            font-weight: 500;
            font-size: 24px;
            padding: 30px 40px!important;  
            color:#25282B!important;
            background-color: white!important;
          }
          .accordion-button:focus{
            border: none!important;
            box-shadow: none!important;
          }
          .accordion-item{
            overflow: hidden;
            border: none!important;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.126)!important; 
            border-radius: 20px!important;
          }
          `}
      </style>
      <Accordion defaultActiveKey='0' flush>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>{title} ({quota})</Accordion.Header>
          <Accordion.Body>
            <div className={style.cards_body}>
              <div className={style.cards_left}>
                <div
                  className={style.cards_image}
                  style={{
                    backgroundImage:
                      `url(${image})`,
                  }}></div>
                <div className={style.cards_details}>
                  <p className={style.cards_head}>Location</p>
                  <p className="d-flex align-items-center">
                    <BiTargetLock className={style.icon_alignment} />
                    &nbsp;{location}
                  </p>
                  <p className={style.cards_head}>Date</p>
                  <p className="d-flex align-items-center">
                    <BiCalendar className={style.icon_alignment} />
                    &nbsp;{convertDate}
                  </p>
                  <p className={style.cards_head}>Category</p>
                  <p className="d-flex align-items-center">
                    <BiInfoCircle className={style.icon_alignment} />
                    &nbsp;{category}
                  </p>
                </div>
              </div>
              <div className={style.cards_right}>
                <p className={style.cards_head}>Details</p>
                <p>{description}</p>
                <div className={style.button_group}>
                  <ButtonSecondary title='Edit Event' onClick={onEdit} />
                  <ButtonTertier title='Delete Event' onClick={onDelete}/>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
