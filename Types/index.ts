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
  value?: string | number ;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type inputTextAreaType = {
  label?: string;
  type?: string;
  value?: string | number ;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type cardsDetailPropsType = {
  location?: string;
  date?: string;
  category?: string;
};

export type cardsCommentPropsType = {
  image?: string;
  name?: string;
  comment?: string;
};

export type inputSearchPropsType = {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

interface dataModalProfileProps {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  occupation?: string;
}

export type modalProfilePropsType = {
  data?: dataModalProfileProps;
  show: boolean
  onChangeName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhone?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOccupation?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitEdit?: () => void;
  onClose?: () => void;
};
