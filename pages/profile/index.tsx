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
import { Footer } from "../../components/Footer/Footer";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Profile() {
  const toast = useToast()
  const router = useRouter()
  const [key, setKey] = useState("hosted");
  const [modalShow, setModalShow] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [editProfile, { loading, error, data: dataUpdate }] =
    useMutation(UPDATE_USER);
  useEffect(() => {
    if(localStorage.getItem('token') === ""){
      router.replace('/sign-in')
    }else{
      fetchDataProfile();
    }
  }, [dataUpdate]);

  const fetchDataProfile = async () => {
    const { data } = await client.query({
      query: GET_OWN_PROFILE,
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    setName(data.getProfile.name);
    setEmail(data.getProfile.email);
    setAddress(data.getProfile.address);
    setOccupation(data.getProfile.occupation);
    setPhone(data.getProfile.phone);
    setAvatar(data.getProfile.avatar);
    setIsLoading(false);
  };

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

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAvatar(value);
  };

  const handleOpenEdit = () => {
    setModalShow(true);
  };

  let dataProfile = {
    name: name,
    email: email,
    address: address,
    phone: phone,
    occupation: occupation,
    avatar: avatar,
  };

  const handleEditProfile = () => {
    editProfile({
      variables: {
        name: name,
        email: email,
        address: address,
        occupation: occupation,
        phone: phone,
        avatar: avatar,
      },
      onCompleted: (data) => {
        if(data.updateUser.code === 200) {
          toast({
            title: "Profile Updated",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setModalShow(false)
          router.reload();
        }
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
  };

  if (isLoading) {
    return <div></div>;
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
              <div
                style={{ backgroundImage: `url(${avatar})` }}
                className={style.profile_pic}></div>
              <div className={style.profile_subtext}>
                <h5>My Name</h5>
                <p>{name}</p>
                <h5>My Address</h5>
                <p>{address}</p>
                <h5>My Occupation</h5>
                <p>{occupation}</p>
              </div>
              <div className={style.profile_subtext}>
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
        <Footer />
        <EditProfileModal
          show={modalShow}
          data={dataProfile}
          onChangeName={handleChangeName}
          onChangeEmail={handleChangeEmail}
          onChangeAddress={handleChangeAddress}
          onChangeOccupation={handleChangeOccupation}
          onChangePhone={handleChangePhone}
          onChangeAvatar={handleChangeAvatar}
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
  onChangeAvatar,
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
          <div className='d-flex  flex-column flex-lg-row justify-content-between mb-2 gap-4'>
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
          <div className='d-flex flex-column flex-lg-row justify-content-between mb-2 gap-4'>
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
              <InputText
                label='Link Avatar'
                value={data?.avatar}
                onChange={onChangeAvatar}
                type='text'
                placeholder='Enter Link Avatar'
              />
            </div>
          </div>
          <div className='mt-3 d-flex justify-content-end gap-2'>
            <ButtonTertier title='Close' onClick={onClose} />
            <ButtonPrimary title='Edit Profile' onClick={onSubmitEdit} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Profile;
