import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { StylesProvider, useToast } from "@chakra-ui/react";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button";
import { CardsComment } from "../../components/CardsComment/CardsComment";
import { CardsDetail } from "../../components/CardsDetail/CardsDetail";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { InputText } from "../../components/Input/Input";
import {
  ADD_COMMENT,
  DELETE_COMMENTS_BY_ID,
  JOIN_EVENT,
  UPDATE_COMMENTS_BY_ID,
} from "../../graphql/Mutation";
import {
  GET_COMMENTS_BY_ID,
  GET_EVENT_BY_ID,
  GET_PARTICIPANT_BY_ID,
} from "../../graphql/Query";
import style from "../../styles/details.module.css";

function DetailsEvent() {
  const toast = useToast();
  const Category = ["Arts", "Technology", "Sports", "Music", "Education"];
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState<string>("");
  const [currentIdComents, setIdComments] = useState<number>(0);

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

  const [deleteComment, { loading: loadingDelete, data: dataDelete }] =
    useMutation(DELETE_COMMENTS_BY_ID);

  const [updateComment] = useMutation(UPDATE_COMMENTS_BY_ID);

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
        if (data.createParticipant.success) {
          toast({
            title: `"You have been Successfully Registered in This Event"`,
            description: "Success to Join Event",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          refetchParticipant();
        } else {
          toast({
            title: `You have been Registered in This Event`,
            description: "Failed to Join Event",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      onError: (error: ApolloError) => {
        if (error.message === "Unexpected token i in JSON at position 0") {
          toast({
            title: "You Must Sign In",
            description: "Failed to Join",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          router.replace("/sign-in");
        }
        console.log(error.message);
      },
    });
  };

  const handleAddComments = () => {
    if (currentIdComents == 0) {
      addComment({
        variables: {
          eventID: id,
          content: comment,
        },
        onCompleted: (data) => {
          console.log(data);
          setComment("");
          if (data.createComment.code === 200) {
            toast({
              title: "Comment Added",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
          }
          refetchComment();
        },
        onError: (error: ApolloError) => {
          if (error.message === "Unexpected token i in JSON at position 0") {
            toast({
              title: "You Must Sign In",
              description: "Failed to Join",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            router.replace("/sign-in");
          }
        },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      });
    } else {
      updateComment({
        variables: {
          id: currentIdComents,
          content: comment,
        },
        onCompleted: (data) => {
          setComment("");
          setIdComments(0)
          if (data.updateComment.code === 200) {
            toast({
              title: "Comment Edited",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            refetchComment();
          }
        },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      });
    }
  };

  const handleEditComments = (idComments: number, content: string) => {
    console.log(content);
    setIdComments(idComments);
    setComment(content);
  };

  const handleDeleteComments = (idComments: number) => {
    deleteComment({
      variables: { id: idComments },
      onCompleted: (data) => {
        console.log(data);
        toast({
          title: "Comment Deleted",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        refetchComment();
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
  };

  console.log(dataComments);
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
                  <h5>Attendees ({dataParticipant.getParticipants.length} / {data.getEvent.quota})</h5>
                  <p>No Participant</p>
                </div>
              ) : (
                <div>
                  <h5>Attendees ({dataParticipant.getParticipants.length} / {data.getEvent.quota})</h5>
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
                    value={comment}
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
                        isUser={
                          parseInt(localStorage.getItem("id")!) == value.user.id
                        }
                        onDelete={() => handleDeleteComments(value.id)}
                        onUpdate={() =>
                          handleEditComments(value.id, value.content)
                        }
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
                canJoin={loadingParticipant ? true : (dataParticipant.getParticipants.length < data.getEvent.quota)}
                />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DetailsEvent;
