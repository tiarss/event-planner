import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ButtonSecondary } from "../../components/Button/Button";
import { CardsComment } from "../../components/CardsComment/CardsComment";
import { CardsDetail } from "../../components/CardsDetail/CardsDetail";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { InputText } from "../../components/Input/Input";
import { ADD_COMMENT, JOIN_EVENT } from "../../graphql/Mutation";
import {
  GET_COMMENTS_BY_ID,
  GET_EVENT_BY_ID,
  GET_PARTICIPANT_BY_ID,
} from "../../graphql/Query";
import style from "../../styles/details.module.css";

function DetailsEvent() {
  const Category = ["Arts", "Technology", "Sports", "Music", "Education"];
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");

  const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: id },
  });
  console.log(data);
  const {
    loading: loadingComments,
    data: dataComments,
    refetch: refetchComment,
  } = useQuery(GET_COMMENTS_BY_ID, { variables: { eventID: id } });

  const {
    loading: loadingParticipant,
    data: dataParticipant,
    refetch: refetchParticipant,
  } = useQuery(GET_PARTICIPANT_BY_ID, { variables: { eventID: id } });

  const [addComment, { loading: loadingComment, data: dataComment }] =
    useMutation(ADD_COMMENT);

  const [joinEvent, { loading: loadingJoin, data: dataJoin }] =
    useMutation(JOIN_EVENT);

  const handleGetComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleJoin = () => {
    joinEvent({
      variables: {
        eventID: id,
      },
      onCompleted: (data) => {
        console.log(data);
        refetchParticipant();
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
  };

  const handleAddComments = () => {
    addComment({
      variables: {
        eventID: id,
        content: comment,
      },
      onCompleted: (data) => {
        console.log(data);
        refetchComment();
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <Head>
          <title>Details Event</title>
          <meta name='description' content='Your Profile Page' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <div className={style.details_body}>
          <h1>{data.getEvent.title}</h1>
          <h5>Hosted by {data.getEvent.user.name}</h5>
          <div
            className={style.details_hero}
            style={{
              backgroundImage: `url(${data.getEvent.image})`,
            }}></div>
          <div className={style.details_desc}>
            <div className={style.details_left}>
              <h5>Details</h5>
              <p className={style.details_text}>{data.getEvent.description}</p>
              {loadingParticipant ? (
                <p>Loading</p>
              ) : dataParticipant.getParticipants.length === 0 ? (
                <div>
                  <h5>Attendees ({dataParticipant.getParticipants.length})</h5>
                  <p>No Participant</p>
                </div>
              ) : (
                <div>
                  <h5>Attendees ({dataParticipant.getParticipants.length})</h5>
                  <div className={style.details_participant}>
                    {dataParticipant.getParticipants.map(
                      (value: any, index: any) => (
                        <OverlayTrigger
                          key={index}
                          placement='top'
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id='button-tooltip'>
                              {value.user.name}
                            </Tooltip>
                          }>
                          <div
                            className={style.details_avatar}
                            style={{
                              backgroundImage: `url(${value.user.avatar})`,
                            }}></div>
                        </OverlayTrigger>
                      )
                    )}
                  </div>
                </div>
              )}
              <div className={style.details_comments}>
                <p className={style.details_head_comments}>Comments</p>
                <div className='d-flex align-items-center'>
                  <InputText
                    type='text'
                    placeholder='Enter Comments'
                    onChange={handleGetComment}
                  />
                  <div className='mt-2 ms-2'>
                    <ButtonSecondary
                      title='Comments'
                      onClick={handleAddComments}
                    />
                  </div>
                </div>
              </div>
              <div className={style.details_read_comments}>
                {loadingComments ? (
                  <p>Loading</p>
                ) : dataComments.getComments.length === 0 ? (
                  <p>No Comments</p>
                ) : (
                  dataComments.getComments.map((value: any, index: any) => (
                    <div key={index}>
                      <CardsComment
                        image={value.user.avatar}
                        comment={value.content}
                        name={value.user.name}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className={style.details_right}>
              <CardsDetail
                onJoin={handleJoin}
                location={data.getEvent.location}
                date={moment(data.getEvent.date).format("yyyy-MM-DD, hh:mm")}
                category={Category[data.getEvent.categoryID]}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
// location,
//   date,
//   category,
export default DetailsEvent;
