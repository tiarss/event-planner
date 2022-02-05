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

<<<<<<< HEAD
export type inputTextAreaType = {
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

=======
>>>>>>> bf59fda94392bf24ab5650d99875f53580c2b1ad
export type cardsDetailPropsType = {
  location?: string;
  date?: string;
  category?: string;
<<<<<<< HEAD
};
=======
}
>>>>>>> bf59fda94392bf24ab5650d99875f53580c2b1ad

export type cardsCommentPropsType = {
  image?: string;
  name?: string;
  comment?: string;
<<<<<<< HEAD
};
=======
}
>>>>>>> bf59fda94392bf24ab5650d99875f53580c2b1ad

export type inputSearchPropsType = {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
<<<<<<< HEAD
};
=======
}

export type inputSelectPropsType = {
  label?: string;
  option?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
>>>>>>> bf59fda94392bf24ab5650d99875f53580c2b1ad
