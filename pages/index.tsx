import react, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { CardsHome } from "../components/CardsHome/CardsHome";
import { ButtonPrimary } from "../components/Button/Button";
import {
  GET_MOST_ATTENDANT_EVENTS,
  GET_JOINABLE_EVENTS,
  GET_EVENTS_BY_SEARCH,
} from "../graphql/Query";
import { Header } from "../components/Header/Header";
import styles from "../styles/index.module.css"
import { Footer } from "../components/Footer/Footer";

const Home = () => {
  const router = useRouter();
  var currentSearchValue = "";
  const [searchValue, setSearchValue] = useState<string>("");

  const { loading: loadingAttendant, data: dataAttendant } = useQuery(
    GET_MOST_ATTENDANT_EVENTS
  );


  const { loading: loadingJoinable, data: dataJoinable } =
    useQuery(GET_JOINABLE_EVENTS);

  const { loading, error, data } = useQuery(GET_EVENTS_BY_SEARCH, {
    variables: {
      search: searchValue,
    },
  });

  if (loadingAttendant) {
    return <p></p>;
  } else if (data && searchValue !== "") {
    return (
      <>
        <Header />
        <div className={styles.banner}>
          <p>
            Create. Attend. <br /> Join
          </p>
        </div>
        <div
          className={styles.search_bar}
          style={{ position: "relative", width: "fit-content" }}>
          <SearchBar onChange={(e) => (currentSearchValue = e.target.value)} />
          <span className={styles.search_button}>
            <ButtonPrimary
              title='Search'
              onClick={() => setSearchValue(currentSearchValue)}
            />
          </span>
        </div>
        <div className='d-flex container w-75 px-4 pt-4 pb-2'>
          <h3>
            {`Our result of "`}<em>{`${searchValue}"`}</em>
          </h3>
        </div>
        <div className='d-flex container justify-content-center w-75'>
          <div className='d-flex container px-2 flex-wrap'>
            {data.getEventsBySearch.map((e: any) => (
              <div key={e.id} className='p-2'>
                <Link href={`events/${e.id}`}>
                  <a className="text-dark">
                    <CardsHome
                      title={
                        e.title.length > 22
                          ? e.title.substring(0, 22) + ".."
                          : e.title
                      }
                      location={e.location}
                      image={e.image}
                      date={moment(e.date).format("YYYY MMM D, hh:mm ") + "WIB"}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  } else if (dataAttendant) {
    return (
      <>
      <Header />
        <div className={styles.banner}>
          <p>
            Create. Attend. <br /> Join
          </p>
        </div>
        <div
          className={styles.search_bar}
          style={{ position: "relative", width: "fit-content" }}>
          <SearchBar onChange={(e) => (currentSearchValue = e.target.value)} />
          <span className={styles.search_button}>
            <ButtonPrimary
              title='Search'
              onClick={() => setSearchValue(currentSearchValue)}
            />
          </span>
        </div>
        <div className='d-flex container w-100 px-4 pt-4 pb-4'>
          <h3 className={styles.h3_text} >Most Attendant</h3>
        </div>
        <div className="d-flex container justify-content-center w-100 pb-5">
          <div className="d-flex container justify-content-center justify-content-md-start px-2 flex-wrap">
            {loadingAttendant ? <p>loading</p> : dataAttendant.getEventMostAttendant.map((e: any) => (
              <div key={e.id} className="p-2">
                <Link href={`events/${e.id}`}>
                  <a className="text-dark">
                    <CardsHome
                      title={
                        e.title.length > 22
                          ? e.title.substring(0, 22) + ".."
                          : e.title
                      }
                      location={e.location}
                      image={e.image}
                      date={moment(e.date).format("YYYY MMM D, hh:mm ") + "WIB"}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='d-flex container justify-content-between align-items-center w-100 px-4 pt-4 pb-4'>
          <h3 className={styles.h3_text}>Join These Events</h3>
          <h6><Link href="/search"><a className='text-dark text-decoration-none'>See All Events</a></Link></h6>
        </div>
        <div className="d-flex container justify-content-center w-100 pb-5">
          <div className="d-flex container justify-content-center justify-content-md-start px-2 flex-wrap">
            {loadingJoinable ? <p>loading</p> : dataJoinable.getJoinableEvents.map((e: any) => (
              <div key={e.id} className="p-2">
                <Link href={`events/${e.id}`}>
                  <a className='text-dark'>
                    <CardsHome
                      title={e.title.length > 22 ? e.title.substring(0,22) + ".." : e.title} 
                      location={e.location}
                      image={e.image}
                      date={moment(e.date).format('YYYY MMM D, hh:mm ') + "WIB"}/>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    )
  } else {
    return null;
  }
}

export default Home;
