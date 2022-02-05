import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonPrimary } from "../../Button/Button";
import { EventCards } from "../../EventsCards/EventCards";
import { InputText } from "../../Input/Input";
import style from "./EventHosted.module.css";

export const EventHosted = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <p className={style.event_hosted_head}>Your Events</p>
        <ButtonPrimary
          title='Create Event'
          onClick={() => setModalShow(true)}
        />
      </div>
      <div className={style.event_list}>
        <EventCards />
        <EventCards />
        <EventCards />
        <EventCards />
      </div>
      <CreateEventModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

function CreateEventModal(props: any) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className='p-4'>
          <h1>Create Event</h1>
          <div className='d-flex justify-content-between mb-2'>
            <div className="w-100">
              <InputText label='Event Name' placeholder='Enter Event Name' />
            </div>
            <div className="w-100">
              <InputText label='Location' placeholder='Enter Event Name' />
            </div>
          </div>
          <div className='d-flex justify-content-between mb-2'>
            <div className="w-100">
              <InputText label='Event Name' placeholder='Enter Event Name' />
            </div>
            <div className="w-100">
              <InputText label='Location' placeholder='Enter Event Name' />
            </div>
          </div>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
