import React, { useState } from "react";
import style from "./Header.module.css";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth] = useState(true);
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={style.header_main}>
      <div className={style.header_logo}>
        <p>Logo</p>
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
              <div onClick={handleOpen} className={style.menu_item}>
                Profile
              </div>
              <div onClick={handleOpen} className={style.menu_item}>
                Log Out
              </div>
            </>
          ) : (
            <>
              <div onClick={handleOpen} className={style.menu_item}>
                Sign In
              </div>
              <div onClick={handleOpen} className={style.menu_item}>
                Sign Up
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
