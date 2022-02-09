import react, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_ALL_EVENTS_PAGINATE,
  GET_EVENTS_BY_SEARCH,
} from "../graphql/Query";
import moment from "moment";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { CardsHome } from "../components/CardsHome/CardsHome";
import { ButtonPrimary } from "../components/Button/Button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "../styles/Search.module.css";
import Head from "next/head";

const Search: NextPage = () => {
  const router = useRouter();
  const limit: number = 8;
  const [offset, setOffset] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  var canPrev: boolean = true;
  var canNext: boolean = true;

  const { loading: loadingPaginate, data: dataPaginate } = useQuery(
    GET_ALL_EVENTS_PAGINATE,
    {
      variables: {
        limit: limit,
        offset: offset,
      },
    }
  );

  offset == 0 ? (canPrev = false) : (canPrev = true);
  offset != 0 ? (canNext = false) : (canNext = true);

  const [search, { loading: loadingSearch, data: dataSearch }] =
    useLazyQuery(GET_EVENTS_BY_SEARCH);

  if (loadingSearch) {
    return <p>loading</p>;
  } else if (dataSearch && searchValue !== "") {
    return (
      <>
        <Head>
          <title>Search</title>
          <meta name='description' content='Your Profile Page' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <div className={styles.banner}>
          <p>
            Create. Attend. <br /> Join
          </p>
        </div>
        <div
          className={styles.search_bar}
          style={{ position: "relative", width: "fit-content" }}>
          <SearchBar onChange={(e) => setSearchValue(e.target.value)} />
          <span className={styles.search_button}>
            <ButtonPrimary
              title='Search'
              isLoading={loadingSearch}
              onClick={() => search({ variables: { search: searchValue } })}
            />
          </span>
        </div>
        <div className='d-flex container w-100 px-4 pt-4 pb-2'>
          <h3>
            {`Our result of "`}
            <em>{`${searchValue}"`}</em>
          </h3>
        </div>

        <div className='d-flex container justify-content-center w-100'>
          <div className='d-flex container justify-content-center justify-content-md-start px-2 flex-wrap'>
            {loadingSearch ? (
              <p>loading</p>
            ) : (
              dataSearch.getEventsBySearch.map((e: any) => (
                <div key={e.id} className='p-2'>
                  <Link href={`events/${e.id}`}>
                    <a className='text-dark'>
                      <CardsHome
                        title={
                          e.title.length > 22
                            ? e.title.substring(0, 22) + ".."
                            : e.title
                        }
                        location={e.location}
                        image={e.image}
                        date={
                          moment(e.date).format("YYYY MMM D, hh:mm ") + "WIB"
                        }
                      />
                    </a>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        <div className='d-flex container w-100 justify-content-end align-items-center px-5 py-2'>
          <div className='px-2'>prev</div>
          {canPrev == true ? (
            <button
              className={styles.prev_button}
              onClick={() => setOffset(offset - limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineLeft />
              </div>
            </button>
          ) : (
            <button
              disabled
              className={styles.prev_button}
              onClick={() => setOffset(offset - limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineLeft />
              </div>
            </button>
          )}
          {canNext == true ? (
            <button
              className={styles.next_button}
              onClick={() => setOffset(offset + limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineRight />
              </div>
            </button>
          ) : (
            <button
              disabled
              className={styles.next_button}
              onClick={() => setOffset(offset + limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineRight />
              </div>
            </button>
          )}
          <div className='px-2'>next</div>
        </div>
        <Footer />
      </>
    );
  } else if (dataPaginate) {
    return (
      <>
        <Head>
          <title>Search</title>
          <meta name='description' content='Your Profile Page' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <div className={styles.banner}>
          <p>
            Create. Attend. <br /> Join
          </p>
        </div>
        <div
          className={styles.search_bar}
          style={{ position: "relative", width: "fit-content" }}>
          <SearchBar onChange={(e) => setSearchValue(e.target.value)} />
          <span className={styles.search_button}>
            <ButtonPrimary
              title='Search'
              onClick={() => search({ variables: { search: searchValue } })}
            />
          </span>
        </div>
        <div className='d-flex container w-100 px-4 pt-4 pb-2'>
          <h3 className={styles.h3_text}>All Events</h3>
        </div>
        <div className='d-flex container justify-content-center w-100'>
          <div className='d-flex container justify-content-center justify-content-md-start px-2 flex-wrap'>
            {loadingPaginate ? (
              <p>loading</p>
            ) : (
              dataPaginate.getPaginationEvents.map((e: any) => (
                <div key={e.id} className='p-2'>
                  <Link href={`events/${e.id}`}>
                    <a className='text-dark'>
                      <CardsHome
                        title={
                          e.title.length > 22
                            ? e.title.substring(0, 22) + ".."
                            : e.title
                        }
                        location={e.location}
                        image={e.image}
                        date={
                          moment(e.date).format("YYYY MMM D, hh:mm ") + "WIB"
                        }
                      />
                    </a>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        <div className='d-flex container w-100 justify-content-end align-items-center px-5 py-2'>
          <div className='px-2'>prev</div>
          {canPrev == true ? (
            <button
              className={styles.prev_button}
              onClick={() => setOffset(offset - limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineLeft />
              </div>
            </button>
          ) : (
            <button
              disabled
              className={styles.prev_button}
              onClick={() => setOffset(offset - limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineLeft />
              </div>
            </button>
          )}
          {canNext == true ? (
            <button
              className={styles.next_button}
              onClick={() => setOffset(offset + limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineRight />
              </div>
            </button>
          ) : (
            <button
              disabled
              className={styles.next_button}
              onClick={() => setOffset(offset + limit)}>
              <div className={styles.icon_positioning}>
                <AiOutlineRight />
              </div>
            </button>
          )}
          <div className='px-2'>next</div>
        </div>
        <Footer />
      </>
    );
  } else {
    return null;
  }
};

export default Search;
