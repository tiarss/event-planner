import { useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { REMOVE_PARTICIPATE } from "../../../graphql/Mutation";
import { GET_OWN_PARTICIPANTS } from "../../../graphql/Query";
import { cardsDataEventType } from "../../../Types";
import { ButtonPrimary } from "../../Button/Button";
import { CardsParticipate } from "../../CardsParticipate/CardsParticipate";
import { EventCards } from "../../EventsCards/EventCards";
import style from "./EventParticipate.module.css";

const Category = ["Arts", "Technology", "Sports", "Music", "Education"];

export const EventParticipate = () => {
  const toast = useToast();
  const [dataParticipant, setDataParticipant] = useState([]);
  const [modeParticipant] = useState(false);
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

  const [removePartipacipate] = useMutation(REMOVE_PARTICIPATE);

  useEffect(() => {
    fetchDataParticipant();
  }, [loadingParticipants]);

  const fetchDataParticipant = () => {
    getParticipants();
  };

  const handleDeleteParticipant = (idEvent: number) => {
    removePartipacipate({
      variables: { eventID: idEvent },
      onCompleted: (data) => {
        if (data.deleteParticipant.code === 200) {
          toast({
            title: "Quit Participation",
            description: "Success Quit Participation",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          refetch();
        }
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <p className={style.event_hosted_head}>Your Participation</p>
      </div>
      <div className={style.event_list}>
        {dataParticipant.map((value: cardsDataEventType) => (
          <div key={value.id}>
            <CardsParticipate
              name={value.title}
              location={value.location}
              date={value.date}
              image={value.image}
              onClick={() => handleDeleteParticipant(value.id)}
            />
            ;
          </div>
        ))}
      </div>
    </>
  );
};
