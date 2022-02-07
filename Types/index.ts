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
  value?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type inputTextAreaType = {
  label?: string;
  type?: string;
  value?: string | number;
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

<<<<<<< HEAD
=======

>>>>>>> main
interface dataModalProfileProps {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  occupation?: string;
}

export type modalProfilePropsType = {
  data?: dataModalProfileProps;
  show: boolean;
  onChangeName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhone?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOccupation?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitEdit?: () => void;
  onClose?: () => void;
};

export type cardsEventType = {
  id?: number;
  title?: string;
  image?: string;
  location?: string;
  date?: string;
  category?: string;
  description?: string;
  quota?: number;
  onEdit?: () => void;
  onDelete?: () => void;
};


export type cardsDataEventType = {
  id: number;
  title: string;
  image: string;
  location: string;
  date: string;
  categoryID: number;
  description: string;
  quota: number;
  
};

interface dataModalEventProps {
  id: number;
  title: string;
  image: string;
  location: string;
  date: string;
  categoryID: number;
  description: string;
  quota?: number;
}

export type modalEventPropsType = {
  mode?: boolean;
  data?: dataModalEventProps;
  show: boolean;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDesc?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeQuota?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLocation?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  onClose?: () => void;
};

export type inputSelectPropsType = {
  label?: string;
  option?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

