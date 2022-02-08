import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_OWN_PARTICIPANTS } from "../../../graphql/Query";
import { cardsDataEventType } from "../../../Types";
import { ButtonPrimary } from "../../Button/Button";
import { EventCards } from "../../EventsCards/EventCards";
import style from "./EventParticipate.module.css";

const Category = ["Arts", "Technology", "Sports", "Music", "Education"];

export const EventParticipate = () => {
  const [dataParticipant, setDataParticipant] = useState([]);
  const [modeParticipant] = useState(false)
  const [
    getParticipants,
    {
      loading: loadingParticipants,
      error: errorParticipants,
      data: dataParticipantss,
      refetch,
    },
  ] = useLazyQuery(GET_OWN_PARTICIPANTS, {
    onCompleted: (data: any) => {
      console.log(data.getParticipateEvent);
      setDataParticipant(data.getParticipateEvent);
    },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  useEffect(() => {
    fetchDataParticipant();
  }, []);

  const fetchDataParticipant = () => {
    getParticipants();
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <p className={style.event_hosted_head}>Your Participation</p>
      </div>
      <div className={style.event_list}>
        {dataParticipant.map((value: cardsDataEventType) => (
          <div key={value.id}>
            <EventCards
              title={value.title}
              location={value.location}
              date={value.date}
              category={Category[value.categoryID-1]}
              description={value.description}
              image={value.image}
              quota={value.quota}
              // onEdit={() => handleEdit(value.id)}
              // onDelete={() => handleDeleteEvent(value.id)}
            />
            ;
          </div>
        ))}
      </div>
    </>
  );
};
