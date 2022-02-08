import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import style from "./Header.module.css";
import { GET_OWN_PROFILE } from "../../graphql/Query";
import client from "../../graphql/client";

export const Header = () => {
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const [small, setSmall] = useState(false);
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 50)
      );
    }
    if (token) {
      console.log("test")
      setIsAuth(true);
      fetchDataProfile();
    }
  }, []);

  const fetchDataProfile = async () => {
    const { data } = await client.query({
      query: GET_OWN_PROFILE,
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    console.log(data);
    setAvatar(data.getProfile.avatar);
    setName(data.getProfile.name);
    setIsLoading(false);
  };

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
    setIsAuth(false);
    setIsLoading(true)
    route.push("/");
  };

  return (
    <div
      className={
        route.route === "/search" || route.route === "/"
          ? small
            ? style.header_main
            : style.header_main_scroll
          : style.header_main_second
      }>
      <div className={style.header_logo}>
        <Link href='/'>
          <p style={{ cursor: "pointer" }}>eventGO</p>
        </Link>
      </div>
      <div className={style.menu}>
        <div className={style.header_menu} onClick={handleOpen}>
          <div
            className={style.header_menu_image}
            style={{
              backgroundImage: `url(${
                isLoading
                  ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  : avatar
              })`,
            }}></div>
          <p className='d-none d-md-block'>{isLoading ? "Guest" : name.substring(0,10)}</p>
        </div>
        <div
          className={isOpen ? style.menu_dropdown : style.menu_dropdown_hidden}>
          {isAuth ? (
            <>
              <Link href='/profile'>
                <div className={style.menu_item}>Profile</div>
              </Link>
              <div onClick={handleLogOut} className={style.menu_item}>
                Log Out
              </div>
            </>
          ) : (
            <>
              <Link href='/sign-in'>
                <div className={style.menu_item}>Sign In</div>
              </Link>
              <Link href='/sign-up'>
                <div className={style.menu_item}>Sign Up</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
