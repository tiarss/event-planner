import React from "react";
import { buttonPropsType } from "../../Types";
import styles from "./Button.module.css";

export const ButtonPrimary = ({
  title,
  onClick,
  disabled,
  isLoading,
}: buttonPropsType) => {
<<<<<<< HEAD
=======

>>>>>>> bf59fda94392bf24ab5650d99875f53580c2b1ad
  return (
    <>
      {isLoading ? (
        <button disabled={disabled} className={styles.button_loading}>
          Submitting...
        </button>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.button_primary}>
          {title}
        </button>
      )}
    </>
  );
};

export const ButtonSecondary = ({
  title,
  onClick,
  disabled,
  isLoading,
}: buttonPropsType) => {
  return (
    <>
      {isLoading ? (
        <button disabled={disabled} className={styles.button_loading}>
          Submitting...
        </button>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.button_secondary}>
          {title}
        </button>
      )}
    </>
  );
};

export const ButtonTertier = ({
  title,
  onClick,
  disabled,
  isLoading,
}: buttonPropsType) => {
  return (
    <>
      {isLoading ? (
        <button disabled={disabled} className={styles.button_loading}>
          Submitting...
        </button>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          className={styles.button_tertier}>
          {title}
        </button>
      )}
    </>
  );
};
