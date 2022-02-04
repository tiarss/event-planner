import React from "react";
import { Accordion } from "react-bootstrap";
import { BiTargetLock, BiCalendar, BiInfoCircle } from "react-icons/bi";
import { ButtonSecondary, ButtonTertier } from "../Button/Button";
import style from "./EventCards.module.css";

export const EventCards = () => {
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
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            <div className={style.cards_body}>
              <div className={style.cards_left}>
                <div
                  className={style.cards_image}
                  style={{
                    backgroundImage:
                      "url(https://asset.kompas.com/crops/KwgrhXBTh3P8uTQwfNT9LDa7ETU=/0x66:1059x772/750x500/data/photo/2019/10/03/5d9585b4b313c.jpg)",
                  }}></div>
                <div className={style.cards_details}>
                  <p className={style.cards_head}>Location</p>
                  <p>
                    <BiTargetLock className={style.icon_alignment} />
                    &nbsp;
                  </p>
                  <p className={style.cards_head}>Date</p>
                  <p>
                    <BiCalendar className={style.icon_alignment} />
                    &nbsp;
                  </p>
                  <p className={style.cards_head}>Category</p>
                  <p>
                    <BiInfoCircle className={style.icon_alignment} />
                    &nbsp;
                  </p>
                </div>
              </div>
              <div className={style.cards_right}>
                <p className={style.cards_head}>Details</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  sit amet erat ultrices, pulvinar libero eu, fringilla ante.
                  Etiam tincidunt leo ut turpis elementum, nec placerat libero
                  laoreet. Suspendisse ullamcorper dolor et bibendum vulputate.
                  Integer faucibus urna id lorem facilisis viverra. In nec quam
                  neque. Aliquam fermentum sapien sed tellus dignissim commodo.
                  Ut aliquam sapien sapien. Etiam faucibus non urna eget
                  elementum. Pellentesque a ipsum nisi. Curabitur quis luctus
                  sapien. Nullam rhoncus lectus vel egestas interdum. Aliquam
                  dignissim odio non nisi bibendum iaculis. Vivamus venenatis,
                  lectus ac ullamcorper ullamcorper, augue leo fermentum elit,
                  at lobortis libero orci eu elit. Aenean mi elit, iaculis sed
                  accumsan quis, feugiat at lorem. Quisque consequat vestibulum
                  libero ac tempor.
                </p>
                <div className={style.button_group}>
                  <ButtonSecondary title="Edit Event" />
                  <ButtonTertier title="Delete Event" />
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
