import Head from "next/head";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ButtonSecondary } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import { EventHosted } from "../../components/UI/EventHosted/EventHosted";
import style from "../../styles/profile.module.css";

function Profile() {
  const [key, setKey] = useState("hosted");
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
              <ButtonSecondary title='Edit Profile' />
            </div>
          </div>
          <div className={style.profile_info}>
            <div className={style.profile_pic}></div>
            <div>
              <h5>My Name</h5>
              <p>John</p>
              <h5>My Email</h5>
              <p>john@gmail.com</p>
              <h5>My Occupation</h5>
              <p>CEO Nokia</p>
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
            <p>My Participation</p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default Profile;
