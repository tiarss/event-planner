import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "./Header.module.css";

export const Header = () => {
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const [small, setSmall] = useState(false);
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 50)
      );
    }
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
    setIsAuth(false)
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
        <Link href="/">
          <p style={{cursor: "pointer"}}>Logo</p>
        </Link>
      </div>
      <div className={style.menu}>
        <div className={style.header_menu} onClick={handleOpen}>
          <div
            className={style.header_menu_image}
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/236x/9c/1d/fd/9c1dfddc68716865d9d90c9cff9d62ed.jpg)",
            }}></div>
          <p className='d-none d-md-block'>Guess</p>
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
