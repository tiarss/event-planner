import React from "react";
import { buttonPropsType } from "../../Types";
import styles from "./Button.module.css";

export const ButtonPrimary = ({
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
  title = "Button Secondary";
  isLoading = false; // masih tahap percobaan, bisa di hapus kalau sedang dipakai
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
  title = "Button Tertier";
  isLoading = false; // masih tahap percobaan, bisa di hapus kalau sedang dipakai
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
