import react, { useState } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { CardsHome } from '../components/CardsHome/CardsHome';
import { ButtonPrimary } from '../components/Button/Button';
import { GET_MOST_ATTENDANT_EVENTS, GET_JOINABLE_EVENTS ,GET_EVENTS_BY_SEARCH } from '../graphql/Query';

const Home: NextPage = () => {
  // const token = localStorage.getItem('token');
  const router = useRouter();
  const limit: number = 3;
  const [offset, setOffset] = useState<number>(0);
  var currentSearchValue = "";
  const [searchValue, setSearchValue] = useState<string>("");

  const {loading, error, data} = useQuery(GET_MOST_ATTENDANT_EVENTS);

  // const {loading: loadingJoinable, error: errorJoinable, data: dataJoinable} = useQuery(GET_JOINABLE_EVENTS);
  
  // const {loading, error, data} = useQuery(GET_EVENTS_BY_SEARCH, {
  //   variables: {
  //     search: searchValue
  //   }
  // });
  if(loading) {
    return (
      <p>loading</p>
    )
  } else if(error) {
    return <p>error</p>
  }
  return (
    <>
      <div className="d-flex py-2 justify-content-center align-items-center">
        <SearchBar onChange={(e) => currentSearchValue=e.target.value}/>
        <span>
          <ButtonPrimary title="Search" onClick={() => setSearchValue(currentSearchValue)}/>
        </span>
      </div>
      <div className='d-flex container w-75 px-4 pt-4 pb-2'>
        <h3>Most Attendant</h3>
      </div>
      <div className="d-flex container justify-content-center w-75">
        <div className="d-flex container px-2 flex-wrap">
          {data.getEventMostAttendant.map((e: any) => (
            <div key={e.id} className="p-2">
              <CardsHome
                title={e.title.length > 22 ? e.title.substring(0,22) + ".." : e.title} 
                location={e.location}
                image={e.image}
                date={moment(e.date).format('YYYY MMM D, hh:mm ') + "WIB"}/>
            </div>
          ))}
        </div>
      </div>
      <div className='d-flex container justify-content-between align-items-center w-75 px-4 pt-4 pb-2'>
        <h3>Join These Events</h3>
        <h6><Link href="/search"><a>See All Events</a></Link></h6>
      </div>
      <div className="d-flex container justify-content-center w-75">
        <div className="d-flex container px-2 flex-wrap">
          {data.getEventMostAttendant.map((e: any) => (
            <div key={e.id} className="p-2">
              <CardsHome
                title={e.title.length > 22 ? e.title.substring(0,22) + ".." : e.title} 
                location={e.location}
                image={e.image}
                date={moment(e.date).format('YYYY MMM D, hh:mm ') + "WIB"}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;
