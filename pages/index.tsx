import type { NextPage } from "next";
import Head from "next/head";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonTertier,
} from "../components/Button/Button";
import { CardsHome } from "../components/CardsHome/CardsHome";
import { InputText } from "../components/Input/Input";
import { CardsDetail } from "../components/CardsDetail/CardsDetail";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ButtonPrimary title="Button Primary"/>
      <ButtonSecondary />
      <ButtonTertier />
      <div style={{display: "flex", gap:"25px", flexWrap: "wrap", padding: "0px 100px"}}>
        <CardsHome />
        <CardsHome />
        <CardsHome />
        <CardsHome />
      </div>
      <InputText />
      <button className="btn btn-primary">Primary</button>
      <CardsDetail location="Bandung, Jawa Barat" date="2022-03-04, 12:34 PM" category="Music"/>
    </div>
  );
};

export default Home;
