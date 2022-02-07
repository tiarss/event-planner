import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonTertier,
} from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import { InputText } from "../../components/Input/Input";
import { EventHosted } from "../../components/UI/EventHosted/EventHosted";
import client from "../../graphql/client";
import { useMutation } from "@apollo/client";
import { GET_OWN_PROFILE } from "../../graphql/Query";
import { UPDATE_USER } from "../../graphql/Mutation";
import style from "../../styles/profile.module.css";
import { modalProfilePropsType } from "../../Types";
import { EventParticipate } from "../../components/UI/EventParticapated/EventParticipate";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNjQ0MDg3NjU4LCJpZCI6Mn0.WTbjczm87Tb6FrDD5NymYN-LL8z0D6oPp-U8lMog3c4";

function Profile() {
  const [key, setKey] = useState("hosted");
  const [modalShow, setModalShow] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [editProfile, { loading, error, data: dataUpdate }] =
    useMutation(UPDATE_USER);

  useEffect(() => {
    fetchDataProfile();
  }, []);

  const fetchDataProfile = async () => {
    const { data } = await client.query({
      query: GET_OWN_PROFILE,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    setName(data.getProfile.name);
    setEmail(data.getProfile.email);
    setAddress(data.getProfile.address);
    setOccupation(data.getProfile.occupation);
    setPhone(data.getProfile.phone);
    setIsLoading(false)
  };

  console.log(phone);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
  };

  const handleChangeOccupation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOccupation(value);
  };

  const handleOpenEdit = () => {
    setModalShow(true);
    // setName(data.getProfile.name);
    // setEmail(data.getProfile.email);
    // setAddress(data.getProfile.address);
    // setOccupation(data.getProfile.occupation);
    // setPhone(data.getProfile.phone);
  };

  let dataProfile = {
    name: name,
    email: email,
    address: address,
    phone: phone,
    occupation: occupation,
  };

  const handleEditProfile = () => {
    editProfile({
      variables: {
        name: name,
        email: email,
        address: address,
        occupation: occupation,
        phone: phone,
      },
      onCompleted: (data) => {
        console.log(data);
      },
    });
  };

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <>
        <Head>
          <title>Profile</title>
          <meta name='description' content='Your Profile Page' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <div className={style.profile_body}>
          <div className={style.profile_left}>
            <div className={style.profile_head}>
              <p className={style.profile_text}>Profile</p>
              <div className='h-100'>
                <ButtonSecondary
                  title='Edit Profile'
                  onClick={handleOpenEdit}
                />
              </div>
            </div>
            <div className={style.profile_info}>
              <div className={style.profile_pic}></div>
              <div>
                <h5>My Name</h5>
                <p>{name}</p>
                <h5>My Address</h5>
                <p>{address}</p>
                <h5>My Occupation</h5>
                <p>{occupation}</p>
              </div>
              <div>
                <h5>My Email</h5>
                <p>{email}</p>
                <h5>My Phone</h5>
                <p>{phone}</p>
              </div>
            </div>
          </div>
          <Tabs
            id='controlled-tab-example'
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className='mb-3'>
            <Tab eventKey='hosted' title='Event Hosted'>
              <EventHosted />
            </Tab>
            <Tab eventKey='participated' title='Event Participated'>
              <EventParticipate />
            </Tab>
          </Tabs>
        </div>
        <EditProfileModal
          show={modalShow}
          data={dataProfile}
          onChangeName={handleChangeName}
          onChangeEmail={handleChangeEmail}
          onChangeAddress={handleChangeAddress}
          onChangeOccupation={handleChangeOccupation}
          onChangePhone={handleChangePhone}
          onClose={() => setModalShow(false)}
          onSubmitEdit={handleEditProfile}
        />
      </>
    );
  }
}

function EditProfileModal({
  data,
  show,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onChangeAddress,
  onChangeOccupation,
  onSubmitEdit,
  onClose,
}: modalProfilePropsType) {
  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className='p-3'>
          <h2>Edit Profile</h2>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Name'
                value={data?.name}
                onChange={onChangeName}
                type='text'
                placeholder='Enter Your Name'
              />
            </div>
            <div className='w-100'>
              <InputText
                label='Email'
                value={data?.email}
                onChange={onChangeEmail}
                type='text'
                placeholder='Enter Your Email'
              />
            </div>
          </div>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Occupation'
                value={data?.occupation}
                onChange={onChangeOccupation}
                type='text'
                placeholder='Enter Your Occupation'
              />
            </div>
            <div className='w-100'>
              <InputText
                label='Phone'
                value={data?.phone}
                onChange={onChangePhone}
                type='text'
                placeholder='Enter Your Phone Number'
              />
            </div>
          </div>
          <div className='d-flex justify-content-between mb-2 gap-4'>
            <div className='w-100'>
              <InputText
                label='Address'
                value={data?.address}
                onChange={onChangeAddress}
                type='text'
                placeholder='Enter Your Address'
              />
            </div>
          </div>
          <div className='mt-3 d-flex justify-content-end gap-2'>
            <ButtonTertier title='Close' onClick={onClose} />
            <ButtonPrimary title='Create Event' onClick={onSubmitEdit} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Profile;
