import react, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useRouter } from 'next/router';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_EVENTS_PAGINATE, GET_EVENTS_BY_SEARCH } from '../graphql/Query';
import moment from 'moment';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { CardsHome } from '../components/CardsHome/CardsHome';
import { ButtonPrimary } from '../components/Button/Button';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styles from '../styles/Search.module.css';

const Search: NextPage = () => {
  const router = useRouter();
  const limit: number = 3;
  const [offset, setOffset] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  
  const {data: dataPaginate} = useQuery(GET_ALL_EVENTS_PAGINATE, {
    variables: {  
      limit: limit,
      offset: offset
    }
  });
  
  const [search, {loading: loadingSearch, data: dataSearch}] = useLazyQuery(GET_EVENTS_BY_SEARCH);

  if(loadingSearch) {
    return (
      <p>loading</p>
    )
  } else if(dataSearch && searchValue !== "") {
    return (
      <>
        <div className="d-flex py-2 justify-content-center align-items-center">
          <SearchBar onChange={(e) => setSearchValue(e.target.value)}/>
          <span
            className={styles.search_button}>
            <ButtonPrimary title="Search" onClick={() => search({ variables: { search: searchValue } })}/>
          </span>
        </div>
        <div className='d-flex container w-75 px-4 pt-4 pb-2'>
          <h3>Our result of "<em>{searchValue}</em>"</h3>
        </div>
        <div className="d-flex container justify-content-center w-75">
          <div className="d-flex container px-2 flex-wrap">
            {dataSearch.getEventsBySearch.map((e: any) => (
              <div key={e.id} className="p-2">
                <Link href={`events/${e.id}`}>
                  <a>
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
        <div className="d-flex container w-75 justify-content-end align-items-center px-5 py-2">
          <div className="px-2">prev</div>
          <div className={styles.prev_button} onClick={() => setOffset(offset-limit)}>
            <div className={styles.icon_positioning}>
              <AiOutlineLeft />
            </div>
          </div>
          <div className={styles.next_button} onClick={() => setOffset(offset+limit)}>
            <div className={styles.icon_positioning}>
              <AiOutlineRight />
            </div>
          </div>
          <div className="px-2">next</div>
        </div>
      </>
    )
  } else if (dataPaginate) {
    return (
      <>
        <div className="d-flex py-2 justify-content-center align-items-center">
          <SearchBar onChange={(e) => setSearchValue(e.target.value)}/>
          <span
            className={styles.search_button}>
            <ButtonPrimary title="Search" onClick={() => search({ variables: { search: searchValue } })}/>
          </span>
        </div>
        <div className='d-flex container w-75 px-4 pt-4 pb-2'>
          <h3>All Events</h3>
        </div>
        <div className="d-flex container justify-content-center w-75">
          <div className="d-flex container px-2 flex-wrap">
            {dataPaginate.getPaginationEvents.map((e: any) => (
              <div key={e.id} className="p-2">
                <Link href={`events/${e.id}`}>
                  <a>
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
        <div className="d-flex container w-75 justify-content-end align-items-center px-5 py-2">
          <div className="px-2">prev</div>
          <div className={styles.prev_button} onClick={() => setOffset(offset-limit)}>
            <div className={styles.icon_positioning}>
              <AiOutlineLeft />
            </div>
          </div>
          <div className={styles.next_button} onClick={() => setOffset(offset+limit)}>
            <div className={styles.icon_positioning}>
              <AiOutlineRight />
            </div>

          </div>
          <div className="px-2">next</div>
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default Search;
