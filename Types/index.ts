import React from "react";

export type buttonPropsType = {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export type cardsHomePropsType = {
  title?: string;
  image?: string;
  location?: string;
  date?: string;
  onClick?: () => void;
};

export type inputTextPropsType = {
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
