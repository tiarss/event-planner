import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonPrimary } from "../../Button/Button";
import { EventCards } from "../../EventsCards/EventCards";
import { InputText, InputTextArea } from "../../Input/Input";
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
        <div className='p-3'>
          <h2>Create Event</h2>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Event Name'
                type='text'
                placeholder='Enter Event Name'
              />
            </div>
            <div className='w-100'>
              <InputText label='Category' placeholder='Select Event Category' />
            </div>
          </div>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Location'
                type='text'
                placeholder='Enter Event Location'
              />
            </div>
            <div className='w-100'>
              <InputText
                label='Date'
                type='datetime-local'
                placeholder='Enter Event Date'
              />
            </div>
          </div>
          <div className='mb-2 w-100'>
            <InputTextArea
              label='Description'
              placeholder='Enter Description'
            />
          </div>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Quota'
                type='number'
                placeholder='Enter Event Quota'
              />
            </div>
            <div className='w-100'>
              <InputText
                label='Link Image'
                type='text'
                placeholder='Enter Event Image Link'
              />
            </div>
          </div>
          <div className="mt-3">
            <ButtonPrimary title='Create Event' onClick={props.onHide} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
