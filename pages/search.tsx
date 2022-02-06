import react, { useState } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { CardsHome } from '../components/CardsHome/CardsHome';
import { GET_ALL_EVENTS } from '../graphql/Query';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styles from '../styles/Search.module.css';

const Search: NextPage = () => {
  // const token = localStorage.getItem('token');
  const router = useRouter();
  
  const toTimestamp = (strDate: string) => {  
    const dt = new Date(strDate).getTime();
    const date = new Date(dt);
    return (date.getFullYear()+
    " "+(new Intl.DateTimeFormat('en-US', { month: "short" }).format(date))+
    " "+date.getDate()+
    ", "+(new Intl.DateTimeFormat('id', { hour: "2-digit" }).format(date))+
    ":"+(new Intl.DateTimeFormat('en-US', { minute: "2-digit" }).format(date))+
    " WIB")
  }

  const {loading, error, data} = useQuery(GET_ALL_EVENTS);

  if(loading) {
    return (
      <p>please wait ..</p>
    )
  } else if(error) {
    return (
      <p>error</p>
    )
  }
  return (
    <>
      <div className="container w-50 pb-2">
        <SearchBar />
      </div>
      <div className='d-flex container w-75 px-4 pt-4 pb-2'>
        <h3>All Events</h3>
      </div>
      <div className="d-flex container justify-content-center w-75">
        <div className="d-flex container px-2 flex-wrap">
          {data.getEvents.map((e: any) => (
            <div key={e.id} className="p-2">
              <CardsHome
                title={e.title.length > 22 ? e.title.substring(0,22) + ".." : e.title} 
                location={e.location}
                image={e.image}
                date={toTimestamp(e.date)}/>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex container w-75 justify-content-end align-items-center px-5 py-2">
        <div className="px-2">prev</div>
        <div className={styles.prev_button}>
          <div className={styles.icon_positioning}>
            <AiOutlineLeft />
          </div>
        </div>
        <div className={styles.next_button}>
          <div className={styles.icon_positioning}>
            <AiOutlineRight />
          </div>
        </div>
        <div className="px-2">next</div>
      </div>
    </>
  )
}

export default Search;
