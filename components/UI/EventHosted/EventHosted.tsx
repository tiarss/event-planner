import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonPrimary, ButtonTertier } from "../../Button/Button";
import { EventCards } from "../../EventsCards/EventCards";
import { InputText, InputTextArea } from "../../Input/Input";
import moment from "moment";
import style from "./EventHosted.module.css";
import client from "../../../graphql/client";
import { GET_OWN_EVENT } from "../../../graphql/Query";
import { cardsDataEventType, modalEventPropsType } from "../../../Types";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
} from "../../../graphql/Mutation";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNjQ0MDg3NjU4LCJpZCI6Mn0.WTbjczm87Tb6FrDD5NymYN-LL8z0D6oPp-U8lMog3c4";

const Category = ["Arts", "Technology", "Sports", "Music", "Education"];

export const EventHosted = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventCategory, setEventCategory] = useState<number>(0);
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventQuota, setEventQuota] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentID] = useState(0);

  const [inputEvent, { loading, error, data }] = useMutation(ADD_EVENT);
  const [
    getEvent,
    { loading: loadingEvent, error: errorEvent, data: dataEvents, refetch },
  ] = useLazyQuery(GET_OWN_EVENT, {
    onCompleted: (data: any) => {
      console.log(data.getOwnEvent);
      setDataEvent(data.getOwnEvent);
    },
    context: {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

  const [
    updateEvent,
    { loading: loadUpdate, error: errorUpdate, data: dataUpdate },
  ] = useMutation(UPDATE_EVENT);
  const [dataEvent, setDataEvent] = useState([]);

  const [deleteEvent] = useMutation(DELETE_EVENT);

  let dataModalEvent = {
    id: currentId,
    title: eventTitle,
    image: eventImage,
    location: eventLocation,
    date: eventDate,
    categoryID: eventCategory,
    description: eventDescription,
    quota: eventQuota,
  };

  useEffect(() => {
    fetchDataEvents();
  }, [isLoading]);

  const fetchDataEvents = async () => {
    getEvent();
  };

  const handleChangeTitle = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setEventTitle(value);
  };

  const handleChangeCategory = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setEventCategory(value);
  };

  const handleChangeDesc = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setEventDescription(value);
  };

  const handleChangeImage = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setEventImage(value);
  };

  const handleChangeLocation = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setEventLocation(value);
  };

  const handleChangeDate = (e: any) => {
    const date = e.target.value;
    const newDate = new Date(date);
    const newsDate = moment(newDate).format();
    setEventDate(newsDate);
    console.log(newsDate);
  };

  const handleChangeQuota = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setEventQuota(value);
  };

  const handleOpenCreate = () => {
    setCurrentID(0);
    setEventTitle("");
    setEventQuota(0);
    setEventLocation("");
    setEventImage("");
    setEventDescription("");
    setEventDate("");
    setEventCategory(0);
    setModalShow(true);
    setEditMode(false);
  };

  const handleAddEvent = () => {
    if (editMode) {
      updateEvent({
        variables: {
          id: currentId,
          title: eventTitle,
          image: eventImage,
          description: eventDescription,
          location: eventLocation,
          date: moment(eventDate).format(),
          categoryID: eventCategory,
          quota: eventQuota,
        },
        onCompleted: (data) => {
          console.log(data);
          setIsLoading(true);
          setModalShow(false);
          refetch();
        },
        context: {
          headers: {
            Authorization:
            `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    } else {
      inputEvent({
        variables: {
          title: eventTitle,
          image: eventImage,
          description: eventDescription,
          location: eventLocation,
          date: eventDate,
          categoryID: eventCategory,
          quota: eventQuota,
        },
        onCompleted: (data) => {
          console.log(data);
          setIsLoading(true);
          setModalShow(false);
          refetch();
        },
        context: {
          headers: {
            Authorization:
            `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    }
  };

  const handleDeleteEvent = (id: number) => {
    deleteEvent({
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        console.log(data);
        refetch();
      },
      context: {
        headers: {
          Authorization:
          `Bearer ${localStorage.getItem('token')}`,  
        },
      },
    });
  };

  const handleEdit = (id: number) => {
    setEditMode(true);
    const filtering: cardsDataEventType | undefined = dataEvent.find(
      (value: cardsDataEventType) => value.id === id
    );
    console.log(filtering);
    if (filtering!) {
      const temp: cardsDataEventType = filtering;
      setCurrentID(temp.id);
      setEventTitle(temp.title);
      setEventQuota(temp.quota);
      setEventLocation(temp.location);
      setEventImage(temp.image);
      setEventDescription(temp.description);
      setEventDate(moment(temp.date).format("yyyy-MM-DDThh:mm"));
      setEventCategory(temp.categoryID);
    }
    setModalShow(true);
  };

  if (loadingEvent) {
    return <div>Loadng</div>;
  } else {
    return (
      <>
        <div className='d-flex align-items-center justify-content-between mb-3'>
          <p className={style.event_hosted_head}>Your Events</p>
          <ButtonPrimary title='Create Event' onClick={handleOpenCreate} />
        </div>
        <div className={style.event_list}>
          {dataEvent.map((value: cardsDataEventType) => (
            <div key={value.id}>
              <EventCards
                title={value.title}
                location={value.location}
                date={value.date}
                category={Category[value.categoryID]}
                description={value.description}
                image={value.image}
                quota={value.quota}
                onEdit={() => handleEdit(value.id)}
                onDelete={() => handleDeleteEvent(value.id)}
              />
              ;
            </div>
          ))}
        </div>
        <CreateEventModal
          mode={editMode}
          data={dataModalEvent}
          show={modalShow}
          onChangeTitle={handleChangeTitle}
          onChangeCategory={handleChangeCategory}
          onChangeDate={handleChangeDate}
          onChangeDesc={handleChangeDesc}
          onChangeImage={handleChangeImage}
          onChangeLocation={handleChangeLocation}
          onChangeQuota={handleChangeQuota}
          onClose={() => setModalShow(false)}
          onSubmit={handleAddEvent}
        />
      </>
    );
  }
};

function CreateEventModal({
  mode,
  data,
  show,
  onChangeCategory,
  onChangeTitle,
  onChangeDate,
  onChangeDesc,
  onChangeImage,
  onChangeLocation,
  onChangeQuota,
  onClose,
  onSubmit,
}: modalEventPropsType) {
  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className='p-3'>
          <h2>{mode ? "Edit" : "Create"} Event</h2>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Event Name'
                type='text'
                placeholder='Enter Event Name'
                value={data?.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className='w-100'>
              <InputText
                label='Category'
                placeholder='Select Event Category'
                onChange={onChangeCategory}
                value={data?.categoryID}
                type='number'
              />
            </div>
          </div>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Location'
                type='text'
                onChange={onChangeLocation}
                value={data?.location}
                placeholder='Enter Event Location'
              />
            </div>
            <div className='w-100'>
              <InputText
                label='Date'
                onChange={onChangeDate}
                value={data?.date}
                type='datetime-local'
                placeholder='Enter Event Date'
              />
            </div>
          </div>
          <div className='mb-2 w-100'>
            <InputTextArea
              label='Description'
              value={data?.description}
              onChange={onChangeDesc}
              placeholder='Enter Description'
            />
          </div>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Quota'
                type='number'
                value={data?.quota}
                onChange={onChangeQuota}
                placeholder='Enter Event Quota'
              />
            </div>
            <div className='w-100'>
              <InputText
                label='Link Image'
                value={data?.image}
                onChange={onChangeImage}
                type='text'
                placeholder='Enter Event Image Link'
              />
            </div>
          </div>
          <div className='mt-3'>
            <ButtonTertier title='Close' onClick={onClose} />
            <ButtonPrimary
              title={mode ? "Edit Event" : "Create Event"}
              onClick={onSubmit}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
